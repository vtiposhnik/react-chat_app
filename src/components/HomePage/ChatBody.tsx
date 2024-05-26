import { useEffect, useState } from "react"
import { useChatStore } from "../../zustand/chatStore"
import { Chat } from "../../util/interfaces"
import { useUserStore } from "../../zustand/userStore"
import { onSnapshot, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

interface Message {
    userId: string,
    msg: string,
    createdAt: Date
}

export default function ChatBody() {
    const [chat, setChat] = useState<Chat | null>(null)
    const { currentChatId } = useChatStore()
    const { currentUser, recipientUser } = useUserStore()

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", currentChatId), (doc) => {
            if (doc.exists()) {
                setChat(doc.data() as Chat)
            }
        })
        return () => {
            unsub();
        };
    }, [currentChatId])

    return (
        <section className="p-4">
            {chat ?
                <div className="flex flex-col gap-3">
                    {chat?.messages.map((message: Message) => (
                        <div key={message.createdAt.toString()} className={`${currentUser!.id === message.userId ? 'self-end' : ''} flex flex-col w-fit border px-4 py-1 rounded-lg bg-white`}>
                            <span className="text-teal-600">
                                {message.userId === currentUser?.id ? currentUser.username : recipientUser?.username}
                            </span>
                            {message.msg}
                        </div>
                    ))}
                </div>
                : <div>Загрузка...</div>}



            {/* <div className="center">
                {chat?.messages?.map((message) => (
                    <div
                        className={
                            message.senderId === currentUser?.id ? "message own" : "message"
                        }
                        key={message?.createAt}
                    >
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                            <span>{format(message.createdAt.toDate())}</span>
                        </div>
                    </div>
                ))}
                {img.url && (
                    <div className="message own">
                        <div className="texts">
                            <img src={img.url} alt="" />
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div> */}

        </section>
    )
}
