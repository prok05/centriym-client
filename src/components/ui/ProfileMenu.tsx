'use client'

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import Link from "next/link";
import {Skeleton} from "@mui/material";
import {useRouter} from 'next/navigation'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// @ts-ignore
export function ProfileMenu({role, paid_lesson_count, isLoading}) {
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
                {role === "student"
                    &&
                    <li className="flex items-center p-3 border-b">
                        <div className="mr-3">
                            <BookOutlinedIcon/>
                        </div>
                        <div>Оплачено уроков: {isLoading ?
                            <Skeleton width="30px" variant="text" sx={{fontSize: '1rem'}}/> : paid_lesson_count}</div>
                    </li>
                }
                {role === "teacher"
                    &&
                    <li className="flex items-center p-3 border-b">
                        <div className="mr-3">
                            <BookOutlinedIcon/>
                        </div>
                        <div>{isLoading ?
                            <Skeleton width="30px" variant="text" sx={{fontSize: '1rem'}}/> : "Преподаватель"}</div>
                    </li>
                }

                {role === "supervisor"
                    &&
                    <li className="flex items-center p-3 border-b">
                        <div className="mr-3">
                            <SupervisorAccountIcon/>
                        </div>
                        <div>{isLoading ?
                            <Skeleton width="30px" variant="text" sx={{fontSize: '1rem'}}/> : "Методист"}</div>
                    </li>
                }

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