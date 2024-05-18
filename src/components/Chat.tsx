import { HiPhoneArrowUpRight } from "react-icons/hi2"

export default function Chat({handleClick}) {

    const testUserProps = [
        {
            name: 'John Silver',
            pfp: '/emo-user.jpg'
        }
    ]

    return (
        <section className="chat border flex-[3]">
            <header className="flex justify-between items-center p-4 border">
                <a className="flex justify-center items-center gap-2" onClick={handleClick}>
                    <img src={testUserProps[0].pfp} alt="user pfp" className="size-[30px] rounded-full" />
                    <span>{testUserProps[0].name}</span>
                </a>
                <HiPhoneArrowUpRight />
            </header>
            <div className="">
                chatBody
            </div>
        </section>
    )
}
