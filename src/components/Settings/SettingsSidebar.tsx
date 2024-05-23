import { Sidebar } from "flowbite-react";
import { HiUser, HiInbox, HiChatBubbleBottomCenter, HiUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function SettingsSidebar({tab}: {tab: string}) {
    return (
        <Sidebar aria-label="Default sidebar example" className="">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/settings?tab=profile'>
                        <Sidebar.Item icon={HiUserCircle} as='div' active={tab === 'profile'}>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to='/settings?tab=chats'>
                        <Sidebar.Item href="#" icon={HiChatBubbleBottomCenter} as='div' label="Pro" labelColor="dark" active={tab === 'chats'}>
                            Chats
                        </Sidebar.Item>
                    </Link>
                    <Link to='/settings?tab=inbox'>
                        <Sidebar.Item href="#" icon={HiInbox} as='div' label="3" active={tab === 'inbox'}>
                            Inbox
                        </Sidebar.Item>
                    </Link>
                    <Link to='/settings?tab=contacts'>
                        <Sidebar.Item href="#" icon={HiUser} as='div' active={tab === 'contacts'}>
                            Contacts
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
