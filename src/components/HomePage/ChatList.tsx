import { HiLogout } from "react-icons/hi"
import { testUserProps } from "../../util/test"
import { HiOutlineCog, HiOutlineUserPlus } from "react-icons/hi2"
import { auth, db } from "../../firebase/firebase"
import { Link } from "react-router-dom"
import { arrayUnion, collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useUserStore } from "../../zustand/userStore"
import { User } from "../../util/interfaces"
import { Modal, Button } from "flowbite-react"
import { userChat } from "../../util/interfaces"
import { useChatStore } from "../../zustand/chatStore"

export default function ChatList() {
    const [userChats, setUserChats] = useState<userChat[]>([])
    const [users, setUsers] = useState<User[]>([])
    const { currentUser, fetchUsers } = useUserStore()
    const { setCurrentChatId } = useChatStore()

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        fetchUsers().then((users) => {
            setUsers(users)
        })
    }, [])

    useEffect(() => {
        if (currentUser) {
            const unSub = onSnapshot(
                doc(db, "userChats", currentUser.id), (res) => {
                    if (res.exists()) {
                        const items = res.data().chats

                        const promises = items.map(async (chat: userChat) => {
                            const userDocRef = doc(db, "users", chat.partnerId)
                            const userDocSnap = await getDoc(userDocRef)

                            const user = userDocSnap.data()

                            return { ...items, user }
                        })
                        Promise.all(promises)
                            .then((data) => {
                                console.log(data, "DATA")
                                setUserChats(data)
                            })
                            .catch((error) => {
                                console.error("Error while fetching the chats", error)
                            })

                    } else {
                        console.error("No such Document available!")
                    }
                }
            );
            return () => {
                unSub();
            };
        }
    }, [currentUser!.id]);

    const handleChatAdd = async (userId: string) => {
        const chatRef = collection(db, 'chats')
        const userChatsRef = collection(db, 'userChats')

        if (!currentUser) return

        try {
            const newChatRef = doc(chatRef)

            await setDoc(newChatRef, {
                chatId: currentUser.id,
                messages: [],
                createdAt: serverTimestamp()
            }, { merge: true });

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    partnerId: userId
                })
            })
            await updateDoc(doc(userChatsRef, userId), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    partnerId: currentUser.id
                })
            })

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <aside className="flex-[1] border-r-2 border-white">
            <div className="flex flex-col gap-4">

                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <img src={testUserProps[0].pfp} alt="user-pfp" className="size-[40px] rounded-full" />
                        <span>{currentUser?.username}</span>
                    </div>
                    <Link to='/settings'><HiOutlineCog size={25} /></Link>
                    <button onClick={() => auth.signOut()}><HiLogout size={25} /></button>
                </div>

                <div className="flex items-center gap-4 px-4 py-2 border-b-2 border-white">
                    <input type="text" placeholder="Search..." className=" p-2 rounded-lg w-full" />
                    <button className="p-2 rounded-lg" onClick={() => setOpenModal(true)}>
                        <HiOutlineUserPlus size={30} />
                    </button>
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Contacts</Modal.Header>
                        <Modal.Body>
                            <ul className="grid gap-3">
                                {users.filter((user) => user.id !== currentUser!.id).map((user) => (
                                    <li key={user.id} className="flex items-center justify-between px-4 py-2 border rounded-lg">
                                        <span className="flex items-center gap-3"><img src="/user-pfp.png" alt="pfp" className="size-[40px]" />{user.username}</span>
                                        <Button onClick={() => { handleChatAdd(user.id) }}>Start a chat</Button>
                                    </li>
                                ))}
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setOpenModal(false)}>I accept</Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Decline
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <ul className="flex flex-col gap-2 mt-4">
                    {userChats.map((chat: userChat, index: number) => (
                        <Link to='' onClick={() => { setCurrentChatId(chat[index].chatId) }} key={chat[index].chatId} className="flex items-center gap-4 rounded-md px-4 py-2">
                            <figure>
                                <img src='/user-pfp.png' alt="user-pfp" className="size-[40px] rounded-full" />
                            </figure>
                            <div className=" gap-4">
                                <h1>{chat.user.username}</h1>
                                <p>{chat.lastMessage}</p>
                            </div>
                        </Link>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
