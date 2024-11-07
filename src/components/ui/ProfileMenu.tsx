'use client'

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import Link from "next/link";
import {Skeleton} from "@mui/material";
import { useRouter } from 'next/navigation'

// @ts-ignore
export function ProfileMenu({paid_lesson_count, isLoading}) {
    const router = useRouter()
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
        <div>
            <ul>
                <li className="flex items-center p-3 border-b">
                    <div className="mr-3">
                        <BookOutlinedIcon/>
                    </div>
                    <div>Оплачено уроков: {isLoading ?
                        <Skeleton width="30px" variant="text" sx={{fontSize: '1rem'}}/> : paid_lesson_count}</div>
                </li>
                <li className="flex items-center p-3 hover:bg-purple-pale cursor-pointer">
                    <div className="mr-3">
                        <SettingsIcon/>
                    </div>
                    <Link href="/dashboard/settings">Настройки</Link>
                </li>
                <li className="flex items-center p-3 hover:bg-purple-pale cursor-pointer">
                    <div className="mr-3">
                        <LogoutIcon sx={{color: "#F13E3E"}}/>
                    </div>
                    <button className="text-[#F13E3E]" onClick={handleLogout}>Выход</button>
                </li>
            </ul>
        </div>
    )
}