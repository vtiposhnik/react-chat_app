import { HiOutlinePaperAirplane, HiPhoneArrowUpRight } from "react-icons/hi2"
import ChatBody from "./ChatBody"
import { useUserStore } from "../../zustand/userStore"
import { useEffect, useState } from "react"
import { db } from "../../firebase/firebase"
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore"
import { useChatStore } from "../../zustand/chatStore"
import { User, userChat } from "../../util/interfaces"

export default function Chat({ handleClick }: { handleClick: () => void }) {
    const { currentUser, getUserById } = useUserStore()
    const { currentChatId, getUsersChats } = useChatStore()

    const [message, setMessage] = useState('')
    const [user, setUser] = useState<User>({
        id: 'string',
        username: 'string',
        email: 'string'
    })
    const [usersChat, setUsersChat] = useState<[userChat] | undefined>([
        {
            chatId: 'string',
            lastMessage: 'string',
            recipientId: 'strin'
        }
    ])

    useEffect(() => {
        getUsersChats(currentUser!.id)
            .then((data) => {
                setUsersChat(data)
            })
            .catch(error => console.log(error))
        getUserById(usersChat[0].recipientId)
            .then((data) => {
                setUser(data)
                console.log(data);
            })
    }, [currentChatId])

    const handleSend = async () => {
        const chatRef = doc(db, 'chats', currentChatId);

        try {
            if (message !== '') {
                await updateDoc(chatRef, {
                    messages: arrayUnion({
                        userId: currentUser!.id,
                        msg: message,
                        createdAt: new Date()
                    })
                }, { merge: true });
                setMessage('')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="chat flex-[3] relative flex flex-col">
            <header className="flex justify-between items-center p-4 border-b-2 border-white ">
                <a className="flex justify-center items-center gap-2 cursor-pointer" onClick={handleClick}>
                    <img src='/user-pfp.png' alt="user pfp" className="size-[40px] rounded-full" />
                    <span>{user && user.username}</span>
                </a>
                <button>
                    <HiPhoneArrowUpRight />
                </button>
            </header>

            <main>
                <ChatBody userChat={usersChat} />
            </main>

            <div className="flex items-center gap-3 mt-auto m-4">
                <input type="text" value={message} className="p-2 w-full border rounded-lg" placeholder={"Your Message..."} onChange={(e) => { setMessage(e.currentTarget.value) }} />
                <button onClick={handleSend}>
                    <HiOutlinePaperAirplane className="border size-[30px] border-black p-1 rounded-full " />
                </button>
            </div>
        </section>
    )
}
