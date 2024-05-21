import { useState } from 'react'
import Chat from '../components/Chat'
import ChatList from '../components/ChatList'
import Details from '../components/Details'

export default function HomePage() {
    const [detailsClicked, setDetailsClicked] = useState(true)

    return (
        <main className='container h-[90vh] w-[90vw] bg-slate-200'>
            <section className=' flex'>
                <ChatList />
                <Chat handleClick={() => { setDetailsClicked((prev) => !prev) }} />
                <Details clicked={detailsClicked} />
            </section>
        </main>
    )
}
