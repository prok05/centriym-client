'use client';

import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {OpenedChat} from "@/components/messages/OpenedChat";
import {NoChat} from "@/components/messages/NoChat";
import {Suspense} from 'react'

// @ts-ignore
export function Conversation() {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
            <div className="h-full">
                {selectedChat ? (<OpenedChat/>) : (<NoChat/>)}
            </div>
    )
}