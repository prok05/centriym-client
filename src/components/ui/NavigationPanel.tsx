"use client"

import {SmallLogo} from "@/components/ui/SmallLogo";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {useRouter} from 'next/navigation';

import HomeIcon from '../icons/HomeIcon'
import LessonsIcon from '../icons/LessonsIcon'
import MessagesIcon from '../icons/MessagesIcon'
import SettingsIcon from "@/components/icons/SettingsIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";

export function NavigationPanel() {
    const pathname = usePathname();
    const router = useRouter();


    async function handleLogout() {
        try {
            // const data = {
            //     "phone": phone,
            //     "password": formData.get("password")
            // }
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
        <div className="flex flex-col w-1/6 flex-grow py-2 px-5 shadow-[4px_0_8px_rgba(0,0,0,0.1)] z-10">
            <div className="flex flex-col flex-grow">
                <SmallLogo/>
                <nav>
                    <p className="font-semibold text-gray-400 uppercase mb-2">Обзор</p>
                    <ul className="font-medium">
                        <li className="mb-2 last:mb-0 flex items-center">
                            <HomeIcon
                                className="mr-3"
                                stroke={pathname === '/dashboard' ? "#702DFF" : "#202020"} />
                            <Link
                                className={pathname === '/dashboard' ? "text-purple-main" : "text-grey-100"}
                                href="/dashboard">Главная</Link>
                        </li>
                        <li className="mb-2 flex items-center">
                            <LessonsIcon
                                className="mr-3"
                                stroke={pathname === '/dashboard/lessons' ? "#702DFF" : "#202020"} />
                            <Link
                                className={pathname === '/dashboard/lessons' ? "text-purple-main" : "text-grey-100"}
                                href="/dashboard/lessons">Уроки</Link>
                        </li>
                        <li className="flex items-center">
                            <MessagesIcon
                                className="mr-3"
                                stroke={pathname === '/dashboard/messages' ? "#702DFF" : "#202020"} />
                            <Link
                                className={pathname === '/dashboard/messages' ? "text-purple-main" : "text-grey-100"}
                                href="/dashboard/messages">Сообщения</Link>
                        </li>
                    </ul>
                </nav>
            </div>


            <nav className="mt-auto pb-5">
                <p className="font-semibold uppercase mb-2 text-gray-400">Настройки</p>
                <ul className="font-medium">
                    <li className="flex items-center mb-1">
                        <SettingsIcon
                            className="mr-3"
                            stroke={pathname === '/dashboard/settings' ? "#702DFF" : "#202020"} />
                        <Link
                            className={pathname === '/dashboard/settings' ? "text-purple-main" : "text-grey-100"}
                            href="/dashboard/settings">Настройки</Link>
                    </li>
                    <li className="flex items-center">
                        <LogoutIcon
                            className="mr-3 "
                        />
                        <button className="text-[#F13E3E]" onClick={handleLogout}>Выход</button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}