import { useEffect, useState } from "react";
import Profile from "../components/Settings/Profile";
import SettingsSidebar from "../components/Settings/SettingsSidebar";
import { useLocation } from "react-router-dom";


export default function Settings() {
    const [tab, setTab] = useState('profile')
    const path = useLocation()
    useEffect(() => {
        const urlParams = new URLSearchParams(path.search)
        const tabValue = urlParams.get('tab')
        if (tabValue) {
            setTab(tabValue)
        }
        console.log(tab)
    }, [path.search])

    return (
        <section className='rounded-lg h-[90vh] w-[90vw] bg-slate-200'>
            <div className="flex">
                <aside className="h-[90vh] flex-[1]">
                    <SettingsSidebar tab={tab} />
                </aside>

                <main className="flex-[4]">
                    {tab === 'profile' && <Profile />}
                </main>
            </div>
        </section>
    )
}
