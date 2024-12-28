import {FetchChatI} from "@/lib/types";
import ChatListLoading from "@/components/messages/ChatListLoading";
import ChatListItemStudent from "@/components/messages/ChatListItemStudent";
import {useQuery} from "@tanstack/react-query";

interface Props {
    data: FetchChatI
}

// @ts-ignore
export default function ChatList({setSelectedChat}) {
    const getTeachers = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`, {
            method: "GET",
            credentials: "include"
        });

        return await response.json();
    };

    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['student-chats'],
        queryFn: getTeachers
    })

    if (isPending) return <ChatListLoading/>

    if (error) return <div>Не удалось загрузить чаты</div>

    if (!data.length) return <div className="h-full text-center pt-10">Список чатов пуст</div>

    // @ts-ignore
    return (
        <div>
            {/*@ts-ignore*/}
            {data.map((teacher) => {
                {/*@ts-ignore*/}
                return <ChatListItemStudent className="p-2 hover:bg-purple-sec cursor-pointer"
                                            chat={teacher}
                                            setSelectedChat={setSelectedChat}
                                            key={teacher.id}>1</ChatListItemStudent>
            })}
        </div>
    )
}