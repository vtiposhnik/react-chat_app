import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function AuthPage() {
    const [tab, setTab] = useState('login')
    const path = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/?tab=login')

        const params = new URLSearchParams(path.search)
        const tabFromURL = params.get('tab')
        if (tabFromURL) {
            setTab(tabFromURL)
        }
    }, [path.search])

    return (
        <section className="rounded-lg h-[90vh] w-[90vw] bg-slate-200">
            sdlfkjsd
        </section>
    )
}
