'use client';

import {ChatI, FetchChatI} from "@/lib/types";
import {chatsResource, teachersResource} from "@/resources/resources";
import {Suspense, useEffect, useState} from "react";
import ChatListLoading from "@/components/messages/ChatListLoading";
import {useInnerUserStore} from "@/store/innerUserStore";
import ChatListItem from "@/components/messages/ChatListItem";

interface Props {
    data: FetchChatI
}

async function fetchChats() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`, {
        method: "GET",
        credentials: "include"
    })

    if (!res.ok) {
        throw new Error('Failed to fetch posts')
    }

    return res.json()
}

// @ts-ignore
export default function ChatList({setSelectedChat}) {
    const innerUser = useInnerUserStore((state) => state.innerUser)
    const [chats, setChats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`, {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                setChats(data)
                setIsLoading(false)
                console.log(data)
            })
    }, [])

    if (isLoading) return <ChatListLoading/>
    if (chats.count == 0) return <div className="h-full text-center pt-10">Список чатов пуст</div>

    return (
        <div>
            {chats.items.map((chat) => {

                return <ChatListItem className="p-2 hover:bg-purple-sec cursor-pointer"
                                     chat={chat}
                                     setSelectedChat={setSelectedChat}
                                     key={chat.id}>1</ChatListItem>
            })}
        </div>
    )
}