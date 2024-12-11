import {Fab, IconButton, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import {useMutation, useQuery} from "@tanstack/react-query";
import EmptyMessages from "@/components/messages/EmptyMessages";
import {useEffect, useRef, useState} from "react";
import MessageList from "@/components/messages/MessageList";

// @ts-ignore
export function OpenedChatTeacher({selectedChat, setSelectedChat, user}) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socketRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            // @ts-ignore
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    function closeChat() {
        setSelectedChat(null)
    }

    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['chat', selectedChat.id],
        queryFn: async() => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/${selectedChat.id}/messages`, {
                method: "GET",
                credentials: "include"
            });

            return await response.json();
        },
        refetchOnMount: true,
        staleTime: 5_000
    })

    useEffect(() => {
        if (!data || !selectedChat?.id) return;

        socketRef.current = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ws?chat_id=${selectedChat.id}`);

        socketRef.current.onopen = () => {
            console.log(`Connected to chat ${selectedChat.id}`);
        };

        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);

            console.log(message.chat_id, selectedChat.id)

            // Добавляем новые сообщения только для текущего чата
            if (message.chat_id === selectedChat.id) {
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
    }, [data, selectedChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (messageContent: string) => {
        const trimmedMessage = messageContent.trim();
        if (!trimmedMessage || !selectedChat?.id || !user?.user?.id) {
            console.error("Invalid message or missing chat/user data");
            return;
        }
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            const messagePayload = {
                type: "NEW_MESSAGE",
                message: {
                    chat_id: selectedChat.id,
                    sender_id: user.user.id,
                    content: trimmedMessage,
                },
            };

            socketRef.current.send(JSON.stringify(messagePayload));
            setMessage("");
        } else {
            console.error("WebSocket connection is not open");
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
                {messages.length > 0 && <MessageList user={user} messages={messages}/>}
                <div ref={messagesEndRef}/>
            </div>
            <div className="flex justify-center items-center bg-gray-50 pb-3 relative">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    multiline
                    value={message}
                    placeholder={'Напишите сообщение'}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.ctrlKey) {
                            event.preventDefault();
                            sendMessage(message);
                        } else if (event.key === "Enter" && event.ctrlKey) {
                            setMessage((prev) => prev + "\n"); // Добавляем новую строку
                        }
                    }}
                    onChange={(event) => setMessage(event.target.value)}
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
                        onClick={() => sendMessage(message)}
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