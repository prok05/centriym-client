import {Avatar, Skeleton} from "@mui/material";

// @ts-ignore
export default function ChatListItemTeacher({chat, setSelectedChat, user}) {
    function onClick() {
        setSelectedChat(chat)
    }

    const showChatSender = (participants, min) => {
        const participant = participants.find((p) => p.user_id !== user.user.id);
        if (min) {
            return `${participant.first_name[0]}${participant.last_name[0]}`
        } else {
            return `${participant.first_name} ${participant.last_name}`
        }
    }

    return (
        <div className="flex px-2 py-2 hover:bg-purple-pale transition-colors cursor-pointer"
             onClick={onClick}
        >
            <div className="mr-5">
                <Avatar className="mb-2" sx={{bgcolor: '#702dff', width: 56, height: 56}}>
                    {showChatSender(chat.participants, true)}
                </Avatar>
            </div>
            <div className="flex flex-col w-2/4">
                <p className="font-bold">{showChatSender(chat.participants, false)}</p>
                <p>{chat.last_message.content}</p>
            </div>
            <div className="ml-auto w-1/6 text-gray-500">
                {/*{formatDate(chat.last_message.created_at)}*/}
            </div>
        </div>
    )
}