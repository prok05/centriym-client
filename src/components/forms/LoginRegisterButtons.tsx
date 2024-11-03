'use client';

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function LoginRegisterButtons() {
    const pathname = usePathname()

    function getButtons() {
        if (pathname === "/register") {
            return (
                <div>
                    <Link className="w-auto text-purple-main bg-white rounded-l-xl py-2 px-9" href="/login">Вход</Link>
                    <Link className="w-auto text-white bg-purple-main rounded-r-xl py-2 px-4"
                       href="/register">Регистрация</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link className="w-auto text-white bg-purple-main rounded-l-xl py-2 px-9" href="/login">Вход</Link>
                    <Link className="w-auto text-purple-main bg-white rounded-r-xl py-2 px-4"
                       href="/register">Регистрация</Link>
                </div>
            )
        }
    }

    return (
        <div className="flex mb-10 mt-3 justify-center">
            {getButtons()}
        </div>
    )
}