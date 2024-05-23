import { HiLogout } from "react-icons/hi"
import { testUserProps } from "../util/test"
import { HiOutlineCog } from "react-icons/hi2"
import { auth, db } from "../firebase/firebase"
import { Link } from "react-router-dom"
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useUserStore } from "../zustand/userStore"
import { User } from "../util/interfaces"

interface Chat {
    userId: string,
    chatId: string,
    lastMessage: string,
    user: User
}

export default function ChatList() {
    const [chats, setChats] = useState<Chat[]>([])
    const { currentUser } = useUserStore()

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

                <div className="flex items-center px-4 py-2 border-b-2 border-white">
                    <input type="text" placeholder="Search..." className=" p-2 rounded-lg w-full" />
                    {/* <i className="p-2 rounded-lg">
                        <HiOutlineFilter size={25} />
                    </i> */}
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
