import MessagesList from "@/components/messages/MessagesList";
import {ChatPanel} from "@/components/messages/ChatPanel";
import NewMessageIcon from "@/components/icons/NewMessageIcon";

export function MessagesPanel() {
    const chats = [
        {
            id: 1232144,
            sender: "Николас",
            lastMessage: "Привет",
            date: "Сент 10, 24"
        },
        {
            id: 2131234,
            sender: "Хуйман",
            lastMessage: "Ку",
            date: "Сент 11, 24"
        }
    ]

    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2">
            <div className="flex flex-col w-1/3 border-r-2">
                <div className="flex justify-between items-center p-5 border-b-2">
                    <h2 className="font-bold">Сообщения</h2>
                    <button className="w-[26px] h-[23px]">
                        <NewMessageIcon />
                    </button>

                </div>

                <div>
                    <MessagesList chats={chats}/>
                </div>
            </div>
            <div className="w-2/3">
                <ChatPanel chats={chats} />
            </div>
        </div>
    )
}