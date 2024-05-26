import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Login from "../components/AuthPage/Login"
import Register from "../components/AuthPage/Register"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/firebase"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import '../index.css'

export default function AuthPage() {
    const [tab, setTab] = useState('login')
    const path = useLocation()
    const [downloadURL, setDownloadURL] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const { email, password } = Object.fromEntries(formData)

        try {
            await signInWithEmailAndPassword(auth, email as string, password as string)
            toast.success("Signed in successfully!")

        } catch (error: unknown) {
            console.log(error)
            toast.error((error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const { email, username, password } = Object.fromEntries(formData)
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return toast.warn("Select another username");
        }

        try {
            if (!downloadURL) setTimeout(() => console.log("Timeout for 5 seconds"), 5000)
            const res = await createUserWithEmailAndPassword(auth, email as string, password as string)

            await setDoc(doc(db, "users", res.user.uid), { //cities/LA
                username,
                email,
                pfp: downloadURL,
                id: res.user.uid
            });
            await setDoc(doc(db, "userChats", res.user.uid), {
                chats: []
            })
            toast.success("Account created successfully!")

        } catch (error: unknown) {
            console.log(error)
            toast.error((error as Error).message)
        } finally {
            if (downloadURL) { setLoading(false) }
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(path.search)
        const tabFromURL = params.get('tab')
        if (tabFromURL) {
            setTab(tabFromURL)
        }
    }, [path.search])

    return tab === 'login' ?
        <Login loading={loading} submitHandler={handleLogin} />
        : <Register loading={loading} setUrl={setDownloadURL} submitHandler={handleRegister} />
}
