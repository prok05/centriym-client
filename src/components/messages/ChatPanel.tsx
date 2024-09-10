'use client';

import { useSearchParams } from 'next/navigation';
import {useEffect, useState} from "react";

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
        <div className="flex justify-center items-center h-full">
            {selectedChat ? (
                <h1>Открытый чат {selectedChat.id}</h1>
            ) : (
                <p className="text-gray-400">Выберите чат или создайте новый</p>
            )}
        </div>
    )
}