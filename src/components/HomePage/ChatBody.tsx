import { useEffect, useState } from "react"
import { useChatStore } from "../../zustand/chatStore"
import { Chat } from "../../util/interfaces"
import { useUserStore } from "../../zustand/userStore"
import { onSnapshot, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { userChat } from "../../util/interfaces"

interface Message {
    userId: string,
    msg: string
}

export default function ChatBody({ userChat }: { userChat: [userChat] | undefined }) {
    const [chat, setChat] = useState<Chat | null>(null)
    const { currentChatId } = useChatStore()
    const { currentUser } = useUserStore()

    useEffect(() => {
        console.log(currentChatId);
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
                        <div className={`${currentUser!.id === message.userId ? 'self-end' : ''} w-fit border px-4 py-2 rounded-lg bg-white`}>
                            {message.msg}
                        </div>
                    ))}
                </div>
                : <div>loading...</div>}



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
