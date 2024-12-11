import {FetchChatI} from "@/lib/types";
import ChatListLoading from "@/components/messages/ChatListLoading";
import ChatListItemStudent from "@/components/messages/ChatListItemStudent";
import {useQuery} from "@tanstack/react-query";
import ChatListItemTeacher from "@/components/messages/teacher/ChatListItemTeacher";

interface Props {
    data: FetchChatI
}

async function fetchChats() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`, {
        method: "GET",
        credentials: "include"
    })

    if (!res.ok) {
        throw new Error('Failed to fetch posts')
    }

    return res.json()
}

// @ts-ignore
export default function ChatListTeacher({setSelectedChat, user}) {

    const getTeachers = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`, {
            method: "GET",
            credentials: "include"
        });

        return await response.json();
    };

    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['teacher-chats', user.user.id],
        queryFn: getTeachers
    })

    if (isPending) return <ChatListLoading/>

    if (error) return <div>Не удалось загрузить чаты</div>

    if (!data.length) return <div className="h-full text-center pt-10">Список чатов пуст</div>

    // @ts-ignore
    return (
        <div>
            {/*@ts-ignore*/}
            {data.map((chat) => {
                return <ChatListItemTeacher
                    user={user}
                    chat={chat}
                    setSelectedChat={setSelectedChat}
                    key={chat.id} />
            })}
        </div>
    )
}