'use client'

import ChatList from "@/components/messages/ChatList";
import {Conversation} from "@/components/messages/Conversation";
import NewMessageIcon from "@/components/icons/NewMessageIcon";
import {useEffect, useRef, useState} from "react";
import NewChat from "@/components/messages/NewChat";

export function MessagesPanelStudent({user}) {
    // const [isCreatingChat, setIsCreatingChat] = useState<boolean>(false)
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null)
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
                    {/*<button onClick={() => setIsCreatingChat(true)} className="w-[26px] h-[23px]">*/}
                    {/*    <NewMessageIcon/>*/}
                    {/*</button>*/}
                </div>
                {/*создание нового чата*/}
                {/*{isCreatingChat && <NewChat*/}
                {/*    setSelectedUser={setSelectedUser}*/}
                {/*    setIsCreatingChat={setIsCreatingChat}/>}*/}

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