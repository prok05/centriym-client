'use client';

import {NoChat} from "@/components/messages/NoChat";
import {OpenedChatTeacher} from "@/components/messages/teacher/OpenedChatTeacher";

// @ts-ignore
export function ConversationTeacher({selectedChat, setSelectedChat, user}) {
    return (
        <div className="h-full">
            {selectedChat ? (<OpenedChatTeacher
                user={user}
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}/>) : (<NoChat/>)}
        </div>
    )
}