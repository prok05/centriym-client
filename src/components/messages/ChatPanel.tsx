'use client';

import { useSearchParams } from 'next/navigation';
import {useEffect, useState} from "react";
import {OpenedChat} from "@/components/messages/OpenedChat";
import {NoChat} from "@/components/messages/NoChat";

export function ChatPanel({chats}) {
    const searchParams = useSearchParams();
    const hasId = searchParams.has("id")
    const id = Number(searchParams.get("id"))

    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        if (id !== null) {
            const chat = chats.find((chat) => chat.id === id);
            setSelectedChat(chat);
        } else {
            setSelectedChat(null);
        }
    }, [id]);

    return (
        <div className="h-full">
            {selectedChat ? (<OpenedChat />) : (<NoChat />)}
        </div>
    )
}