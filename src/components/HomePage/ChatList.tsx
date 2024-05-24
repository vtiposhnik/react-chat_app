import { HiLogout } from "react-icons/hi"
import { testUserProps } from "../../util/test"
import { HiOutlineCog, HiOutlineUserPlus } from "react-icons/hi2"
import { auth, db } from "../../firebase/firebase"
import { Link } from "react-router-dom"
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useUserStore } from "../../zustand/userStore"
import { User } from "../../util/interfaces"
import { Modal, Button } from "flowbite-react"

interface Chat {
    userId: string,
    chatId: string,
    lastMessage: string,
    user: User
}

export default function ChatList() {
    const [chats, setChats] = useState<Chat[]>([])
    const [users, setUsers] = useState<User[]>([])
    const { currentUser, fetchUsers } = useUserStore()

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        fetchUsers().then((users) => {
            console.log(users, "CHAT LIST")
            setUsers(users)
        })
    }, [])

    useEffect(() => {
        if (currentUser) {
            const unSub = onSnapshot(
                doc(db, "userChats", currentUser.id), (res) => {
                    if (res.exists()) {
                        const items = res.data().chats

                        const promises = items.map(async (chat: Chat) => {
                            const userDocRef = doc(db, "users", chat.userId)
                            const userDocSnap = await getDoc(userDocRef)

                            const user = userDocSnap.data()

                            return { ...items, user }
                        })
                        Promise.all(promises)
                            .then((data) => {
                                setChats(data)
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

    console.log(users)

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
                                {users.map((user) => (
                                    <li key={user.id} className="flex items-center justify-between px-4 py-2 border rounded-lg">
                                        <span className="flex items-center gap-3"><img src="/user-pfp.png" alt="pfp" className="size-[40px]" />{user.username}</span>
                                        <Button>Start a chat</Button>
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
                    {chats.map((chat: Chat) => (
                        <li key={chat.chatId} className="flex items-center gap-4 rounded-md px-4 py-2">
                            <figure>
                                <img src='/user-pfp.png' alt="user-pfp" className="size-[40px] rounded-full" />
                            </figure>
                            <div className=" gap-4">
                                <h1>{chat.user.username}</h1>
                                <p>{chat.lastMessage}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
