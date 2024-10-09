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
    // const [chats, setChats] = useState<FetchChatI>({count: 0, items: []});
    const [isCreatingChat, setIsCreatingChat] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedChatId, setSelectedChatId] = useState(null);
    const socket = useRef<WebSocket | null>()
    const [ws, setWs] = useState(null);

    // const chats = chatsResource.read()

    useEffect(() => {
        // setIsLoading(true)
        // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`, {
        //     method: "GET",
        //     credentials: "include"
        // })
        //     .then(response => response.json())
        //     .then((data) => {
        //         console.log(data)
        //         setChats(data);
        //     })
        //     .catch((e) => {
        //         setError("Не удалось загрузить чаты")
        //     })
        //     .finally(() => {
        //         setIsLoading(false)
        //     })


        // Устанавливаем WebSocket соединение
        // const ws = establishWebSocketConnection();

        socket.current = new WebSocket('ws://localhost:8080/ws')
        socket.current.onopen = () => {
            console.log("Connected")
        }
        // Обработка входящих сообщений
        // ws.onmessage = (event) => {
        //     const newMessage = JSON.parse(event.data);
        //     // Обновление чата с новым сообщением
        //     setChats((prevChats) => {
        //         // Логика обновления чата с новым сообщением
        //         // Например, добавление нового сообщения в последний чат
        //         return prevChats.map(chat => {
        //             if (chat.id === newMessage.chatID) {
        //                 return {
        //                     ...chat,
        //                     lastMessage: newMessage,
        //                 };
        //             }
        //             return chat;
        //         });
        //     });
        // };

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
                <div>
                    <ChatList/>
                </div>
            </div>
            <div className="w-2/3">
                <Conversation/>
            </div>
        </div>
    )
}