export default function ChatItem(props: MessageItemProps) {

    return (
        <li className="p-3 mb-1 last:mb-0 cursor-pointer hover:bg-purple-sec transition-colors" onClick={() => props.onClick(props.id)}>
            <div className="flex">
                <div className="mr-6 my-auto">
                    <span>\O/</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold">{props.senderName}</span>
                    <span>{props.lastMessage}</span>
                </div>
                <div className="ml-auto">
                    <span className="text-xs">
                        {props.date}
                    </span>
                </div>
            </div>
        </li>
    )
}

type MessageItemProps = {
    id: number
    senderName: string
    date: string,
    lastMessage: string
    onClick: (id: number) => void
}