import React from 'react';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button, {ButtonProps} from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useQuery} from "@tanstack/react-query";
import MessagesList from "@/components/messages/supervisor/MessagesList";
import {styled} from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function MessagesDialog({chat, open, setOpen, selectedUser}) {
    const messageQuery = useQuery({
        queryKey: ["chat-message", selectedUser.id],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/${chat.id}/messages`, {
                method: "GET",
                credentials: "include"
            });

            return await response.json();
        },
        staleTime: 1000 * 60
    })

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
        >
            <div className="flex justify-end">
                <DialogTitle id="opened-chat-dialog">
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={(theme) => ({
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>

            </div>
            <DialogContent>
                {messageQuery.isFetching && <div>Загрузка</div>}
                {messageQuery.data && <MessagesList
                    chatID={chat.id}
                    participants={chat.participants}
                    selectedUserID={selectedUser.id}
                    messages={messageQuery.data}
                />}
            </DialogContent>
        </Dialog>
    );
}

export default MessagesDialog;