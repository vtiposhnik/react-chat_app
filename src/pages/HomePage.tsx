import { useState } from 'react'
import Chat from '../components/HomePage/Chat'
import ChatList from '../components/HomePage/ChatList'
import Details from '../components/HomePage/Details'

export default function HomePage() {
    const [detailsClicked, setDetailsClicked] = useState(true)

    return (
        <main className='rounded-lg h-[90vh] w-[90vw] bg-slate-200'>
            <section className=' flex'>
                <ChatList />
                <Chat handleClick={() => { setDetailsClicked((prev) => !prev) }} />
                <Details clicked={detailsClicked} />
            </section>
        </main>
    )
}
