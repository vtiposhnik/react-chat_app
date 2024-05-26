import { Accordion } from "flowbite-react"
import { useUserStore } from "../../zustand/userStore"

export default function Details({ clicked }: { clicked: boolean }) {
    const { recipientUser } = useUserStore()
    const date = new Date()

    return (
        <aside style={{ display: clicked ? 'block' : 'none' }} className="flex-[1] border-l-2 border-white">
            <div className="user flex flex-col gap-3 items-center border-b-2 border-white py-4">
                <figure className="mx-auto flex flex-col items-center">
                    <img src={`${recipientUser?.pfp || '/user-pfp.png'}`} alt="user pfp" className="size-[150px] object-cover rounded-full border-2 border-slate-600" />
                    <span className="text-lg">~{recipientUser && recipientUser.username}</span>
                </figure>
                <div className="px-2 py-4">
                    <span>Last Seen: {date.toDateString()}</span>
                </div>
            </div>
            <div className="px-2 mt-2">
                <Accordion>
                    <Accordion.Panel>
                        <Accordion.Title> Shared Media</Accordion.Title>
                        <Accordion.Content>
                            <p>
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title> Shared Files</Accordion.Title>
                        <Accordion.Content>
                            <p>

                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title> Shared Links</Accordion.Title>
                        <Accordion.Content>
                            <p>

                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </aside>
    )
}
