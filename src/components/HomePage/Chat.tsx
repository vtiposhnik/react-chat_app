import { HiOutlinePaperAirplane, HiPhoneArrowUpRight } from "react-icons/hi2"
import ChatBody from "./ChatBody"
import { useUserStore } from "../../zustand/userStore"
import { useState } from "react"
import { db } from "../../firebase/firebase"
import { arrayUnion, doc, setDoc } from "firebase/firestore"
import { useChatStore } from "../../zustand/chatStore"

export default function Chat({ handleClick }: { handleClick: () => void }) {
    const { currentUser } = useUserStore()
    const { currentChatId } = useChatStore()

    const [message, setMessage] = useState('')

    const handleSend = () => {
        const chatRef = doc(db, 'chats', currentChatId);

        setDoc(chatRef, {
            messages: arrayUnion({
                userId: currentUser!.id,
                msg: message
            })
        }, { merge: true });
        setMessage('')
    }
    return (
        <section className="chat flex-[3] relative flex flex-col">
            <header className="flex justify-between items-center p-4 border-b-2 border-white ">
                <a className="flex justify-center items-center gap-2 cursor-pointer" onClick={handleClick}>
                    <img src='/user-pfp.png' alt="user pfp" className="size-[40px] rounded-full" />
                    <span>{currentUser && currentUser.username}</span>
                </a>
                <button>
                    <HiPhoneArrowUpRight />
                </button>
            </header>

            <main>
                <ChatBody />
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
