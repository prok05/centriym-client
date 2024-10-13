import {Avatar, Skeleton} from "@mui/material";
import formatDate from "@/utils/utils";

export default function ChatListItem({chat, setSelectedChat}) {
    function onClick() {
        setSelectedChat(chat.id)
        console.log('selected chat', chat.id)
    }

    return (
        <div className="flex px-2 py-2 hover:bg-purple-sec transition-colors cursor-pointer"
            onClick={onClick}
        >
            <div className="mr-5">
                <Avatar className="mb-2" sx={{bgcolor: '#702dff', width: 56, height: 56}}>
                    {chat.participants[0].first_name[0]}{chat.participants[0].last_name[0]}
                </Avatar>
            </div>
            <div className="flex flex-col w-2/4">
                <p>{chat.participants[0].first_name} {chat.participants[0].last_name}</p>
                <p>{chat.last_message.content}</p>
            </div>
            <div className="ml-auto w-1/6 text-gray-500">
                {/*{formatDate(chat.last_message.created_at)}*/}
            </div>
        </div>
    )


}