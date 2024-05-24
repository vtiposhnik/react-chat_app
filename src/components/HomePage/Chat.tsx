import { HiOutlinePaperAirplane, HiPaperAirplane, HiPhoneArrowUpRight } from "react-icons/hi2"
import ChatBody from "./ChatBody"
import { useUserStore } from "../../zustand/userStore"

export default function Chat({ handleClick }: { handleClick: () => void }) {
    const { currentUser } = useUserStore()

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
                <input type="text" className="p-2 w-full border rounded-lg" placeholder={"Your Message..."} />
                <button>
                    <HiOutlinePaperAirplane className="border size-[30px] border-black p-1 rounded-full " />
                </button>
            </div>
        </section>
    )
}
