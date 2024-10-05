'use client';

import ChatItem from "@/components/messages/MessageItem";
import { useRouter } from 'next/navigation';
import {useEffect} from "react";
import {ChatI, FetchChatI} from "@/lib/types";

interface Props  {
    data: FetchChatI
}

// @ts-ignore
export default function ChatList(props: Props) {

    if (props.data.count == 0) {
        return <div>Список чатов пуст</div>
    }

    return (
        <div>
            {props.data.items[0].id}
        </div>
    )


}