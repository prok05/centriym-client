// @ts-ignore
import {showChatSender} from "@/utils/utils";

const Message = ({ isFirstInGroup, isCurrentUser, message, senderName }) => {
    return (
        <div className={`flex flex-col ${isCurrentUser ? "self-end" : "self-start"} mb-3`}>
            {isFirstInGroup && !isCurrentUser && <span className="self-start text-sm text-gray-600 mb-1">{senderName.split(' ')[0]}</span>}
            {isFirstInGroup && isCurrentUser && <span className="self-end text-sm text-gray-600 mb-1">Вы</span>}
            <div
                className={`px-4 py-3 ${
                    isCurrentUser ? "bg-purple-main text-white" : "bg-gray-200 text-gray-700"
                } rounded-xl ${
                    isCurrentUser ? "rounded-tr-none" : "rounded-tl-none"
                }`}
            >
                {message.content}
            </div>
        </div>
    );
};

// @ts-ignore
const MessageList = ({ user, messages, senderName }) => {
    // @ts-ignore
    const isStartOfGroup = (currentMessage, previousMessage) => {
        return (
            !previousMessage ||
            currentMessage.sender_id !== previousMessage.sender_id
        );
    };

    // @ts-ignore
    return (
        <div className="flex flex-col py-6 w-4/5">
            {messages.map((message, index) => {
                const isFirstInGroup = isStartOfGroup(message, messages[index - 1]);
                const isCurrentUser = message.sender_id === user.user.id;

                return (
                    <Message
                        key={message.id}
                        isFirstInGroup={isFirstInGroup}
                        isCurrentUser={isCurrentUser}
                        message={message}
                        senderName={senderName} // Передаем имя отправителя
                    />
                );
            })}
        </div>
    );
};

export default MessageList;