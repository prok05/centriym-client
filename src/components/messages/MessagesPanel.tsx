'use client'

import ChatList from "@/components/messages/ChatList";
import {Conversation} from "@/components/messages/Conversation";
import NewMessageIcon from "@/components/icons/NewMessageIcon";
import {useEffect, useState} from "react";
import ChatI from "@/lib/types";
import {establishWebSocketConnection} from "@/ws/websocket";

export function MessagesPanel() {
    const [chats, setChats] = useState<ChatI[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Функция для загрузки чатов
        const fetchChats = async () => {
            setIsLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`); // Получаем список чатов
            const data = await response.json();
            setChats(data); // Сохраняем чаты в состоянии
            setIsLoading(false)
        };

        fetchChats();

        // Устанавливаем WebSocket соединение
        const ws = establishWebSocketConnection();

        // Обработка входящих сообщений
        ws.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            // Обновление чата с новым сообщением
            setChats((prevChats) => {
                // Логика обновления чата с новым сообщением
                // Например, добавление нового сообщения в последний чат
                return prevChats.map(chat => {
                    if (chat.id === newMessage.chatID) {
                        return {
                            ...chat,
                            lastMessage: newMessage,
                        };
                    }
                    return chat;
                });
            });
        };

        return () => {
            ws.close(); // Закрываем соединение при размонтировании компонента
        };
    }, []);


    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2">
            <div className="flex flex-col w-1/3 border-r-2">
                <div className="flex justify-between items-center p-5 border-b-2">
                    <h2 className="font-bold">Сообщения</h2>
                    <button className="w-[26px] h-[23px]">
                        <NewMessageIcon />
                    </button>

                </div>

                <div>
                    <ChatList props={isLoading} />
                </div>
            </div>
            <div className="w-2/3">
                <Conversation />
            </div>
        </div>
    )
}