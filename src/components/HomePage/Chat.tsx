import { HiOutlinePaperAirplane, HiPhoneArrowUpRight } from "react-icons/hi2"
import ChatBody from "./ChatBody"
import { useUserStore } from "../../zustand/userStore"
import { useEffect, useState } from "react"
import { db } from "../../firebase/firebase"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useChatStore } from "../../zustand/chatStore"

export default function Chat({ handleClick }: { handleClick: () => void }) {
    const { currentUser, getUserById, setRecipientUser, recipientUser } = useUserStore()
    const { currentChatId, getUsersChats } = useChatStore()

    const [message, setMessage] = useState('')
    // const [recipientUser, setRecipient] = useState<User | undefined>(mockUser)


    useEffect(() => {
        async function fetchInitialData() {
            try {
                const res = await getUsersChats(currentUser!.id)

                if (res && res?.length > 0) {
                    const user = await getUserById(res[0].recipientId)
                    setRecipientUser(user)
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchInitialData()

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
                });
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
                    <img src={`${recipientUser?.pfp || '/user-pfp.png'}`} alt="user pfp" className="size-[40px] object-cover rounded-full" />
                    <span>{recipientUser && recipientUser.username}</span>
                </a>
                <button>
                    <HiPhoneArrowUpRight />
                </button>
            </header>

            <main>
                <ChatBody />
            </main>

            <div className="flex items-center gap-3 mt-auto m-4">
                <input type="text" value={message} className="p-2 w-full border rounded-lg" placeholder={"Ваше сообщение..."} onChange={(e) => { setMessage(e.currentTarget.value) }} />
                <button onClick={handleSend}>
                    <HiOutlinePaperAirplane className="border size-[30px] border-black p-1 rounded-full " />
                </button>
            </div>
        </section>
    )
}
