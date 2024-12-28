'use client';

import {OpenedChatStudent} from "@/components/messages/OpenedChatStudent";
import {NoChat} from "@/components/messages/NoChat";

// @ts-ignore
export function Conversation({selectedChat, setSelectedChat, user}) {
    return (
        <div className="h-full">
            {selectedChat ? (<OpenedChatStudent
                user={user}
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}/>) : (<NoChat/>)}
        </div>
    )
}