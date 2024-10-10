'use client'

import ChatList from "@/components/messages/ChatList";
import {Conversation} from "@/components/messages/Conversation";
import NewMessageIcon from "@/components/icons/NewMessageIcon";
import {Suspense, useEffect, useRef, useState} from "react";
import ChatListLoading from "@/components/messages/ChatListLoading";
import NewChat from "@/components/messages/NewChat";
import {chatsResource} from "@/resources/resources";
import ErrorBoundary from "@/components/error/ErrorBoundary";

export function MessagesPanel() {
    const [isCreatingChat, setIsCreatingChat] = useState<boolean>(false)
    const [selectedChat, setSelectedChat] = useState(null);
    const socket = useRef<WebSocket | null>()
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Устанавливаем WebSocket соединение

        socket.current = new WebSocket('ws://localhost:8080/ws')
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
                    <button onClick={() => setIsCreatingChat(true)} className="w-[26px] h-[23px]">
                        <NewMessageIcon/>
                    </button>

                </div>
                {isCreatingChat && <NewChat setIsCreatingChat={setIsCreatingChat}/>}
                <div className="h-full">
                    <ChatList setSelectedChat={setSelectedChat}/>
                </div>
            </div>
            <div className="w-2/3">
                <Conversation setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>
            </div>
        </div>
    )
}