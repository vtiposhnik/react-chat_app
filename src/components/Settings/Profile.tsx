export default function Profile() {
    return (
        <section className="w-[50%] p-4 flex flex-col items-center gap-4 text-center mx-auto">
            <div className="">
                <input type="file" />
            </div>
            <button><img src="/user-pfp.png" alt="" className="size-[100px]"/></button>
            <form className="flex flex-col gap-2">
                <label htmlFor="">Your Full Name: </label>
                <input type="text" />
                <label htmlFor="">Bio: </label>
                <input type="text" />
                <label htmlFor="">Phone Number: </label>
                <input type="text" />
            </form>
            <button> 
                Sign Out
            </button>
        </section>
    )
}
