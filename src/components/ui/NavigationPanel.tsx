"use client"

import {SmallLogo} from "@/components/ui/SmallLogo";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {useRouter} from 'next/navigation';

import HomeIcon from '../icons/HomeIcon'
import LessonsIcon from '../icons/LessonsIcon'
import MessagesIcon from '../icons/MessagesIcon'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';

export function NavigationPanel() {
    const pathname = usePathname();
    const router = useRouter();


    async function handleLogout() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/logout`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                credentials: "include"
            })

            switch (response.status) {
                case 400:
                    return
                case 200:
                    router.push("/login")
                    break
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col w-1/12 flex-grow py-8 px-5 shadow-[4px_0_8px_rgba(0,0,0,0.1)] z-10">
            <div className="flex flex-col flex-grow">
                <nav>
                    {/*<p className="font-semibold text-gray-400 uppercase mb-2">Обзор</p>*/}
                    <ul className="font-medium">
                        <li className="mb-2 last:mb-0 flex items-center">
                            {/*<HomeIcon*/}
                            {/*    className="mr-3"*/}
                            {/*    stroke={pathname === '/dashboard' ? "#702DFF" : "#202020"}/>*/}
                            <HomeOutlinedIcon
                                sx={{
                                    color: pathname === '/dashboard' ? "#702DFF" : "#202020",
                                    marginRight: "8px",
                                    fontSize: 20,
                                }} />
                            <Link
                                className={pathname === '/dashboard' ? "text-purple-main" : "text-grey-100"}
                                href="/dashboard">Главная</Link>
                        </li>
                        <li className="mb-2 flex items-center">
                            {/*<LessonsIcon*/}
                            {/*    className="mr-3"*/}
                            {/*    stroke={pathname === '/dashboard/lessons' ? "#702DFF" : "#202020"}/>*/}
                            <CollectionsBookmarkOutlinedIcon
                                sx={{
                                    color: pathname === '/dashboard/lessons' ? "#702DFF" : "#202020",
                                    marginRight: "8px",
                                    fontSize: 20,
                                }} />
                            <Link
                                className={pathname === '/dashboard/lessons' ? "text-purple-main" : "text-grey-100"}
                                href="/dashboard/lessons">Уроки</Link>
                        </li>
                        <li className="flex mb-2 items-center">
                            {/*<MessagesIcon*/}
                            {/*    className="mr-3"*/}
                            {/*    stroke={pathname === '/dashboard/messages' ? "#702DFF" : "#202020"}/>*/}
                            <EmailOutlinedIcon
                                sx={{
                                    color: pathname === '/dashboard/messages' ? "#702DFF" : "#202020",
                                    marginRight: "8px",
                                    fontSize: 20,
                                }} />
                            <Link
                                className={pathname === '/dashboard/messages' ? "text-purple-main" : "text-grey-100"}
                                href="/dashboard/messages">Сообщения</Link>
                        </li>
                        <li className="flex items-center">
                            <ArticleOutlinedIcon
                                // fontSize="small"
                                sx={{
                                    color: pathname === '/dashboard/homework' ? "#702DFF" : "#202020",
                                    marginRight: "8px",
                                    fontSize: 20,
                                }} />
                            <Link
                                className={pathname === '/dashboard/homework' ? "text-purple-main" : "text-grey-100"}
                                href="/dashboard/homework">Д/ЗЗ</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}