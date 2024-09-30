'use client';

import ChatItem from "@/components/messages/MessageItem";
import { useRouter } from 'next/navigation';

interface Props  {
    isLoading: boolean
}

// @ts-ignore
export default function ChatList(props) {

    return (
        <div>
            {props.isLoading ? <div>Загрузка</div> : <div>Ок</div>}
        </div>
    )


}