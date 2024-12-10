import React from 'react';
import {useQuery} from "@tanstack/react-query";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MessagesDialog from "@/components/messages/supervisor/MessagesDialog";

function UserChats({selectedUser}) {
    const [open, setOpen] = React.useState(false);

    const showParticipant = (participants) => {
        const p = participants.filter((participant) => participant.user_id != selectedUser.id);
        return `${p[0].first_name} ${p[0].last_name}`
    }

    const chatsQuery = useQuery({
        queryKey: ["user-chats", selectedUser.id],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats/users/${selectedUser.id}`, {
                method: "GET",
                credentials: "include"
            });

            return await response.json();
        },
        staleTime: 1000 * 60
    })

    if (chatsQuery.isFetching) {
        return <div>loading...</div>
    }

    return (
        <div className="p-4 pt-8 h-full">
            <Typography align="center" variant="h6">Пользователь: {selectedUser.first_name} {selectedUser.last_name}</Typography>
            <Divider sx={{mt: "25px"}} />
            {chatsQuery.data.length
                ?
                <List>
                    {chatsQuery.data.map((chat) => {
                        return <ListItem>
                            <ListItemButton onClick={() => setOpen(true)}>
                                <ListItemText primary={showParticipant(chat.participants)}/>
                            </ListItemButton>

                            <MessagesDialog chat={chat} open={open} selectedUser={selectedUser} setOpen={setOpen}/>
                        </ListItem>
                    })}
                </List>
                : <div className="flex justify-center items-center h-full">У данного пользователя нет чатов.</div>
            }
        </div>
    );
}

export default UserChats;