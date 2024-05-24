import { useEffect, useState } from "react"
import { useChatStore } from "../../zustand/chatStore"
import { Chat } from "../../util/interfaces"
import { useUserStore } from "../../zustand/userStore"
import { onSnapshot, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

interface Message {
    userId: string,
    msg: string
}

export default function ChatBody() {
    const [chat, setChat] = useState<Chat | null>(null)
    const { currentChatId } = useChatStore()
    const { currentUser } = useUserStore()

    useEffect(() => {
        console.log(currentChatId);
        const unsub = onSnapshot(doc(db, "chats", currentChatId), (doc) => {
            setChat(doc.data())
            console.log(doc.data(), "THIS IS chats DATA");
        })
        return () => {
            unsub();
        };
    }, [currentChatId])

    return (
        <section className="p-4">
            {chat ?
                <div>
                    {chat?.messages.map((message: Message) => (
                        <div className={`${currentUser!.id === chat.chatId ? 'flex' : 'flex flex-end'}`}>
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
