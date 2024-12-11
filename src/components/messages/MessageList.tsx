

// @ts-ignore
function MessageList({messages, user}) {

    // @ts-ignore
    const Message = ({user, message}) => {
        if (message.sender_id === user.user.id) {
            return (
                <div className="p-2 bg-purple-main text-white self-end mb-2 rounded">
                    <div>{message.content}</div>
                </div>
            )
        } else {
            return (
                <div className="p-2 bg-gray-200 text-gray-700 self-start mb-2 rounded">
                    <div>{message.content}</div>
                </div>
            )
        }
    }


    return (
        <div className="flex flex-col py-6 w-4/5">
            {/*@ts-ignore*/}
            {messages.map((message) => (
                <Message key={message.id} user={user} message={message}/>
            ))}
        </div>
    );
}

export default MessageList;