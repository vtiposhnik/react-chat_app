export default function Details({clicked}: {clicked: boolean}) {

    return (
        <aside style={{display: clicked ? 'block' : 'none'}} className="flex-[1] border-l-2 border-white">
            Details
        </aside>
    )
}
