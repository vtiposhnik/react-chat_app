export default function Details({clicked}: {clicked: boolean}) {

    return (
        <aside style={{display: clicked ? 'block' : 'none'}} className="flex-[1] border-l-2 border-white">
            <div className="user flex flex-col">
                <figure>
                    <img src="" alt="" />
                </figure>
                <span>

                </span>
            </div>
            <div className="info"></div>
        </aside>
    )
}
