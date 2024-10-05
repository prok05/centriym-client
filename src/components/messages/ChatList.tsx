'use client';

import ChatItem from "@/components/messages/MessageItem";
import { useRouter } from 'next/navigation';
import {useEffect} from "react";
import {ChatI} from "@/lib/types";

interface Props  {
    chats: ChatI[]
}

// @ts-ignore
export default function ChatList(props: Props) {

    return (
        <div>
            {props.chats.length ? <p>Ок</p> : <p>Пусто</p>}
        </div>
    )


}