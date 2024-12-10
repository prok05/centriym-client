import React from 'react';
import moment from 'moment'

function MessagesList({participants, selectedUserID, chatID, messages}) {
    return (
        <div className="flex flex-col gap-2 overflow-auto">
            {messages.map((message) => {
                const sender = participants.find((p) => p.user_id === message.sender_id);
                const isCurrentUser = message.sender_id === selectedUserID;

                return (
                    <div
                        key={message.id}
                        className={`flex flex-col ${
                            isCurrentUser ? "self-end items-end" : "self-start items-start"
                        }`}
                    >
                        <div className="text-sm text-gray-500 mb-1">
                            {sender?.first_name + " " + sender?.last_name || "Неизвестен"} • {moment(message.created_at).format("DD MMM yyyy HH:mm")}
                        </div>
                        <div
                            className={`p-3 rounded-lg mb-2 ${
                                isCurrentUser
                                    ? "bg-purple-main text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            {message.content}
                        </div>

                    </div>
                );
            })}
        </div>

    );
}

export default MessagesList;