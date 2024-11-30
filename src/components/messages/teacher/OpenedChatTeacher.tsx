import {Fab, IconButton, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import {useMutation, useQuery} from "@tanstack/react-query";
import EmptyMessages from "@/components/messages/EmptyMessages";
import {useState} from "react";
import MessageList from "@/components/messages/MessageList";

// @ts-ignore
export function OpenedChatTeacher({selectedChat, setSelectedChat, user}) {
    const [message, setMessage] = useState('');

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

    // // @ts-ignore
    // const getChats = async () => {
    //
    // };

    const sendMessage = async(id, message) => {
        const trimmedMessage = message.trim()
        const body = {
            "user_id": id,
            "message": {
                "content": trimmedMessage,
                "chat_id": selectedChat.id,
                "sender_id": user.user.id
            }
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/messages`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(body)
        });
        if (response.status == 201) {
            setMessage('')
        }
    }

    const sendMessageMutation = useMutation({
        mutationKey: ["send-message"],
        mutationFn: (variables: {message: string, chatID: number, userID: number}) => {
            const trimmedMessage = variables.message.trim()
            const body = {
                "user_id": 0,
                "message": {
                    "content": trimmedMessage,
                    "chat_id": variables.chatID,
                    "sender_id": variables.userID
                }
            }
            return
        },
        onSuccess() {

            setMessage('')
        }
    })

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

                {!data && <EmptyMessages />}
                {data && <MessageList user={user} messages={data}/>}

                <button onClick={() => console.log(data)}>Click</button>
            </div>
            <div className="flex justify-center items-center bg-gray-50 pb-3 relative">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    multiline
                    value={message}
                    placeholder={'Напишите сообщение'}
                    onChange={(event) => setMessage(event.target.value)}
                    maxRows={4}
                    sx={{
                        minWidth: "70%",
                        bgcolor: "white",
                    }}
                />
                <div className="ml-7">
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="add"
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