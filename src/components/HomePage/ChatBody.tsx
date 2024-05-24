import { useEffect, useState } from "react"
import { useChatStore } from "../../zustand/chatStore"
import { Chat } from "../../util/interfaces"

export default function ChatBody() {
    const [chat, setChat] = useState<Chat | null>(null)
    const {currentChat} = useChatStore()
    
    useEffect(() => {
        console.log(currentChat)
        setChat(currentChat)
    }, [])

    return (
        <section>
            {currentChat ? <div>{currentChat.chatId}</div> : <div>loading...</div>}

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
