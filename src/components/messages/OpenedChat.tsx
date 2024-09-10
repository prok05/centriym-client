export function OpenedChat() {
    const user_id = 222;

    const messages = [
        {user_id: 222, text: "Привет"},
        {user_id: 333, text: "Привет"},
        {user_id: 222, text: "Как дела?"},
        {user_id: 333, text: "Нормально, у тебя?"},
        {user_id: 222, text: "Да тоже"},
        {user_id: 333, text: "Скидывай бабки"},
        {user_id: 222, text: "Нет!"},
        {user_id: 333, text: "Ок!"},
    ]

    return (
        <div className="flex flex-col h-full">
            <div className="p-5 flex items-center border-b-2">
                <p>Имя отправителя</p>
                <button className="ml-auto mr-4">х</button>
            </div>
            <div className="bg-gray-50 h-full flex flex-col">
                {messages.map((m) => (
                    <span>{m.text}</span>
                ))}
            </div>
        </div>
    )
}