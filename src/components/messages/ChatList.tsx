'use client';

import {ChatI, FetchChatI} from "@/lib/types";
import {chatsResource, teachersResource} from "@/resources/resources";
import {Suspense} from "react";
import ChatListLoading from "@/components/messages/ChatListLoading";
import {useInnerUserStore} from "@/store/innerUserStore";
import ChatListItem from "@/components/messages/ChatListItem";

interface Props {
    data: FetchChatI
}

// @ts-ignore
export default function ChatList() {
    const innerUser = useInnerUserStore((state) => state.innerUser)

    function List() {
        const chats = chatsResource.read()
        if (innerUser) {
            console.log(chats)
            return (
                <div>
                    <ul>
                        {chats.items.map((chat) => {
                            return <ChatListItem chat={chat} className="p-2 hover:bg-purple-sec cursor-pointer"
                                       key={chat.id}>1</ChatListItem>
                        })}
                    </ul>
                </div>)
        }
    }

    return (
        <div>
            <Suspense fallback={<ChatListLoading/>}>
                <List/>
            </Suspense>
        </div>
    )
}