import { Link } from "react-router-dom";

export default function Register({submitHandler}: {submitHandler: (e: React.FormEvent<HTMLFormElement>) => void}) {
    return (
        <section className="h-[90vh] w-[90vw] p-4 rounded-lg bg-slate-200 text-center">
            <form className="lg:w-[40%] p-8 mx-auto flex flex-col gap-4 border-gray-600 border rounded-lg" onSubmit={submitHandler}>
                <label htmlFor="username">Email:</label>
                <input name="email" id="username" type="text" className="w-full p-2" placeholder="Your email..." />
                <label htmlFor="username">Username</label>
                <input name="username" id="username" type="text" className="w-full p-2" placeholder="Your username..." />
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="text" className="w-full p-2" placeholder="Your password..." />
                <button className="border border-gray-600 rounded-lg p-3 hover:bg-white transition-all">Sign Up</button>
                <span>Already have an account? <Link to='/?tab=login'>Sign In</Link></span>
            </form>
        </section>
    )
}
