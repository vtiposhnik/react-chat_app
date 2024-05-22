import { ErrorInfo, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Login from "../components/AuthPage/Login"
import Register from "../components/AuthPage/Register"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/firebase"
import { doc, setDoc } from "firebase/firestore";


export default function AuthPage() {
    const [tab, setTab] = useState('login')
    const path = useLocation()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const { email, password } = Object.fromEntries(formData)

        try {
            const res = await signInWithEmailAndPassword(auth, email as string, password as string)
            toast.success("Signed in successfully!")

        } catch (error: unknown) {
            console.log(error)
            toast.error((error as Error).message)
        }

    }
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const { email, username, password } = Object.fromEntries(formData)

        try {
            const res = await createUserWithEmailAndPassword(auth, email as string, password as string)

            await setDoc(doc(db, "users", res.user.uid), { //cities/LA
                username,
                email,
                id: res.user.uid
            });
            toast.success("Account created successfully!")

        } catch (error: unknown) {
            console.log(error)
            toast.error((error as Error).message)
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(path.search)
        const tabFromURL = params.get('tab')
        if (tabFromURL) {
            setTab(tabFromURL)
        }
    }, [path.search])

    return tab === 'login' ? <Login submitHandler={handleLogin} /> : <Register submitHandler={handleRegister} />
}
