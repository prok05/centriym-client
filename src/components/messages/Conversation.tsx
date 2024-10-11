'use client';

import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {OpenedChat} from "@/components/messages/OpenedChat";
import {NoChat} from "@/components/messages/NoChat";
import {Suspense} from 'react'
import {Button, TextField} from "@mui/material";

// @ts-ignore
export function Conversation({selectedChat, setSelectedChat, selectedUser, setSelectedUser}) {
    const [message, setMessage] = useState('')

    function createChat() {
        const chatData = {
            "chat_type": "private",
            "name": ""
        }
    }

    if (selectedUser) {
        return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col justify-center w-2/3">
                <p>Напишите сообщение</p>
                <div className="mb-2">
                    <TextField id="outlined-basic"
                               onChange={(e) => setMessage(e.target.value)}
                               variant="outlined"
                               sx={{
                                   minWidth: "70%",
                                   bgcolor: "white",
                               }}/>
                </div>

                <div>
                    <Button
                        className="mr-5"
                        onClick={() => console.log(message)}
                            variant="contained">Отправить</Button>
                    <Button onClick={() => setSelectedUser((prev) => !prev)}
                            variant="contained">Отмена</Button>
                </div>

            </div>

        </div>
        )
    }


    return (
        <div className="h-full">
            {selectedChat ? (<OpenedChat
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}/>) : (<NoChat/>)}
        </div>
    )
}