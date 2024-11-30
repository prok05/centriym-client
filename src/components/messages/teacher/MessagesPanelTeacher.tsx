'use client'

import {useEffect, useRef, useState} from "react";
import ChatListTeacher from "@/components/messages/teacher/ChatListTeacher";
import {ConversationTeacher} from "@/components/messages/teacher/ConversationTeacher";

export function MessagesPanelTeacher({user}) {
    const [selectedChat, setSelectedChat] = useState(null);
    const socket = useRef<WebSocket | null>()
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Устанавливаем WebSocket соединение

        socket.current = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ws`)
        socket.current.onopen = () => {
            console.log("Connected")
        }
        return () => {
            socket.current?.close(); // Закрываем соединение при размонтировании компонента
        };
    }, []);


    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2">
            <div className="flex flex-col w-1/3 border-r-2 relative">
                <div className="flex justify-between items-center p-5 border-b-2">
                    <h2 className="font-bold">Сообщения</h2>
                </div>

                <div className="h-full">
                    <ChatListTeacher user={user} setSelectedChat={setSelectedChat}/>
                </div>
            </div>
            <div className="w-2/3">
                <ConversationTeacher
                    user={user}
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                />
            </div>
        </div>
    )
}