'use client';

import MessagesItem from "@/components/messages/MessageItem";
import { useRouter } from 'next/navigation';


export default function MessagesList({chats}) {
    const router = useRouter();

    const onClick = (id: number) => {
        router.push(`/dashboard/messages?id=${id}`)
    }

    return (
        <ul>
            {chats.map((chat) => (
                <MessagesItem id={chat.id} onClick={onClick} key={chat.sender} senderName={chat.sender} lastMessage={chat.lastMessage} date={chat.date}
                />
            ))}
        </ul>
    )
}