'use client'

import {NavigationPanel} from "@/components/ui/NavigationPanel";
import {ProfilePanel} from "@/components/ui/ProfilePanel";
import {useUserID} from "@/hooks/useUserID";
import {useInnerUserStore} from "@/store/innerUserStore";
import {useEffect} from "react";
import {Header} from "@/components/ui/Header";

export default function DashboardLayout({
    children, // will be a page or nested layout
        }: {
    children: React.ReactNode
}) {
    const userID = useUserID()
    const innerUser = useInnerUserStore((state) => state.innerUser);
    const setInnerUser = useInnerUserStore((state) => state.setInnerUser)

    useEffect(() => {
        if (innerUser) return;

        if (userID) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${userID}`, {
                method: "GET",
                credentials: "include"
            })
                .then(response => response.json())
                .then((data) => {
                    setInnerUser(data)
                })
        }

    }, [userID, innerUser, setInnerUser]);

    return (
        <section className="h-screen">
            <Header />
            <div className="flex">
                <NavigationPanel />
                <div className="bg-gray-50 p-10 overflow-hidden w-10/12 z-1">
                    {children}
                </div>
            </div>
        </section>
    )
}