'use client'

import ChatList from "@/components/messages/ChatList";
import {Conversation} from "@/components/messages/Conversation";
import {useEffect, useRef, useState} from "react";

export function MessagesPanelStudent({user}) {
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null)
    const chatSocket = useRef<WebSocket | null>()
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Устанавливаем WebSocket соединение

        chatSocket.current = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ws`)
        chatSocket.current.onopen = () => {
            console.log("Connected")
        }
        chatSocket.current.onmessage = (event) => {
            console.log("chat event", event.data)
            const notification = JSON.parse(event.data);
            if (notification.type === "NEW_MESSAGE") {
                // Логика для обновления списка чатов
                console.log("New message in chat:", notification.payload.chat_id);
            }
        }
        return () => {
            chatSocket.current?.close(); // Закрываем соединение при размонтировании компонента
        };
    }, []);


    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2">
            <div className="flex flex-col w-1/3 border-r-2 relative">
                <div className="flex justify-between items-center p-5 border-b-2">
                    <h2 className="font-bold">Сообщения</h2>
                </div>

                <div className="h-full">
                    <ChatList setSelectedChat={setSelectedChat}/>
                </div>
            </div>
            <div className="w-2/3">
                <Conversation
                    user={user}
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </div>
        </div>
    )
}