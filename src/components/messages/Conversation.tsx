'use client';

import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {OpenedChat} from "@/components/messages/OpenedChat";
import {NoChat} from "@/components/messages/NoChat";
import {Suspense} from 'react'

// @ts-ignore
export function Conversation({selectedChat, setSelectedChat}) {

    return (
            <div className="h-full">
                {selectedChat ? (<OpenedChat
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}/>) : (<NoChat/>)}
            </div>
    )
}