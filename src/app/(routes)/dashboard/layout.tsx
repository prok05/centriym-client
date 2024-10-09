'use client'

import {NavigationPanel} from "@/components/ui/NavigationPanel";
import {ProfilePanel} from "@/components/ui/ProfilePanel";
import {useUserID} from "@/hooks/useUserID";
import {useInnerUserStore} from "@/store/innerUserStore";
import {useEffect} from "react";

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
        <section className="flex h-screen">
            <NavigationPanel />
            <div className="w-2/3 bg-gray-100 p-10 overflow-hidden">
                    {children}
            </div>
            <ProfilePanel />

        </section>
    )
}