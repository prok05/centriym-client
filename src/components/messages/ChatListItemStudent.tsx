import {Avatar, Skeleton} from "@mui/material";

// @ts-ignore
export default function ChatListItemStudent({chat, setSelectedChat}) {
    function onClick() {
        setSelectedChat(chat)
    }

    return (
        <div className="flex px-4 py-4 hover:bg-purple-pale transition-colors cursor-pointer"
            onClick={onClick}
        >
            <div className="mr-5">
                <Avatar className="mb-2" sx={{bgcolor: '#702dff', width: 56, height: 56}}>
                    {chat.first_name[0]}{chat.last_name[0]}
                </Avatar>
            </div>
            <div className="flex flex-col w-2/4">
                <p>{chat.first_name} {chat.last_name}</p>
                {/*<p>{chat.last_message.content}</p>*/}
            </div>
            <div className="ml-auto w-1/6 text-gray-500">
                {/*{formatDate(chat.last_message.created_at)}*/}
            </div>
        </div>
    )
}