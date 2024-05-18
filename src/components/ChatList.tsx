import { HiDotsVertical } from "react-icons/hi"
import { testUserProps } from "../util/test"

export default function ChatList() {

    return (
        <aside className="border flex-[1] p-2">
            <div className="w-[20vw] ">
                <input type="text" placeholder="Search..." className="border p-2 w-full rounded-lg" />
                <ul className="flex flex-col gap-2 mt-4">
                    {testUserProps.map((chat) => (
                        <li key={chat.id} className="border rounded-md px-4 py-2">
                            <div className="flex items-center justify-between gap-4">
                                <h1>{chat.name}</h1>
                                <HiDotsVertical />
                            </div>
                            <p>Last Message...</p>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
