import {Fab, IconButton, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import {useQuery} from "@tanstack/react-query";
import EmptyMessages from "@/components/messages/EmptyMessages";
import {useEffect, useRef, useState} from "react";
import MessageList from "@/components/messages/MessageList";

// @ts-ignore
export function OpenedChatStudent({selectedChat, setSelectedChat, user}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef(null);
    const [firstMessage, setFirstMessage] = useState<boolean>(false)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            // @ts-ignore
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    function closeChat() {
        setSelectedChat(null)
    }

    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['chat', selectedChat.id],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/get/${selectedChat.id}`, {
                method: "GET",
                credentials: "include"
            });

            return await response.json();
        },
        refetchOnMount: true,
        staleTime: 5_000
    })

    useEffect(() => {
        // если нет сообщений или выбранного чата, не подключаемся к вебсокет
        if (!data || !selectedChat?.id) {
            return
        }

        socketRef.current = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ws?chat_id=${selectedChat.id}`);

        socketRef.current.onopen = () => {
            console.log(`Connected to chat ${selectedChat.id}`);
        };

        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);

            console.log(message.sender_id, selectedChat.id)

            // Добавляем новые сообщения только для текущего чата
            if (message.teacher_id === selectedChat.id) {
                // @ts-ignore
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socketRef.current.onclose = () => {
            console.log(`WebSocket disconnected from chat ${selectedChat.id}`);
        };

        setMessages(data);

        return () => {
            socketRef.current?.close();
            socketRef.current = null;
        };
    }, [data, selectedChat, firstMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (id: string, messageContent: string) => {
        const trimmedMessage = messageContent.trim();
        if (!trimmedMessage || !selectedChat?.id || !user?.user?.id) {
            console.error("Invalid message or missing chat/user data");
            return;
        }

        const messagePayload = {
            type: "NEW_MESSAGE",
            user_id: id,
            message: {
                chat_id: selectedChat.id,
                sender_id: user.user.id,
                content: trimmedMessage,
                teacher_id: selectedChat.id,
            },
        };

        try {
            // Отправка через WebSocket
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                socketRef.current.send(JSON.stringify(messagePayload));
                console.log("Message sent via WebSocket:", messagePayload);
            } else {
                // Если WebSocket недоступен или это первое сообщение
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/messages`, {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                        user_id: id,
                        message: { content: trimmedMessage },
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    console.log("Message sent via API");
                    await refetch(); // Обновляем список чатов/сообщений
                    setFirstMessage(true); // Помечаем, что первый чат создан
                } else {
                    console.error("Failed to send message via API:", response.statusText);
                }
            }

            setMessage(""); // Очистка поля ввода
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            <div className="py-3 px-6 flex justify-between items-center border-b-2">
                <Typography variant="subtitle1">
                    {selectedChat.first_name} {selectedChat.last_name}
                </Typography>
                <IconButton onClick={closeChat} aria-label="delete">
                    <CloseIcon/>
                </IconButton>
            </div>
            <div className="bg-gray-50 h-full flex flex-col items-center overflow-y-scroll">
                {messages.length === 0 && <EmptyMessages/>}
                {messages.length > 0 && <MessageList senderName={selectedChat.first_name} user={user} messages={messages}/>}
                <div ref={messagesEndRef}/>
            </div>
            <div className="flex justify-center items-center bg-gray-50 pb-3 relative">
                <TextField
                    id="outlined-basic"
                    type={"submit"}
                    variant="outlined"
                    multiline
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.ctrlKey) {
                            event.preventDefault();
                            sendMessage(selectedChat.id, message);
                        } else if (event.key === "Enter" && event.ctrlKey) {
                            setMessage((prev) => prev + "\n"); // Добавляем новую строку
                        }
                    }}
                    value={message}
                    placeholder={"Напишите сообщение"}
                    onChange={(event) => {
                        setMessage(event.target.value)
                    }}
                    maxRows={4}
                    sx={{
                        minWidth: "70%",
                        bgcolor: "white",
                        "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                                borderColor: "#702DFF",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#702DFF",
                            },
                        }
                    }}
                />
                <div className="ml-7">
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="add"
                        focusRipple={true}
                        onClick={() => sendMessage(selectedChat.id, message)}
                        sx={{
                            bgcolor: "#702DFF",
                        }
                        }>
                        <SendIcon/>
                    </Fab>
                </div>
            </div>
        </div>
    )
}