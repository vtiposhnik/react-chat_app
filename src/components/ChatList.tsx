import { HiLogout } from "react-icons/hi"
import { testUserProps } from "../util/test"
import { HiOutlineCog } from "react-icons/hi2"
import { auth } from "../firebase/firebase"
import { Link } from "react-router-dom"

export default function ChatList() {
    
    return (
        <aside className="flex-[1] border-r-2 border-white">
            <div className="flex flex-col gap-4">

                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <img src={testUserProps[0].pfp} alt="user-pfp" className="size-[40px] rounded-full" />
                        <span>{testUserProps[0].name}</span>
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
                    {testUserProps.map((chat) => (
                        <li key={chat.id} className="flex items-center gap-4 rounded-md px-4 py-2">
                            <figure>
                                <img src={chat.pfp} alt="user-pfp" className="size-[40px] rounded-full" />
                            </figure>
                            <div className=" gap-4">
                                <h1>{chat.name}</h1>
                                <p>Last Message...</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
