import {Fab, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export function OpenedChat({selectedChat, setSelectedChat}) {

    function closeChat() {
        setSelectedChat(null)
    }

    return (
        <div className="flex flex-col h-full relative">
            <div className="p-5 flex items-center border-b-2">
                <p>Имя отправителя</p>
                <button onClick={closeChat}
                    className="ml-auto mr-4">х</button>
            </div>
            <div className="bg-gray-50 h-full flex flex-col">
                <p>Сообщения</p>
                {/*{messages.map((m) => (*/}
                {/*    <span>{m.text}</span>*/}
                {/*))}*/}
            </div>
            <div className="flex justify-center items-center bg-gray-50 pb-3 relative">
                <TextField id="outlined-basic"
                           variant="outlined"
                           sx={{
                               minWidth: "70%",
                               bgcolor: "white",
                               // '&.MuiOutlinedInput-root': {
                               //     '&:hover fieldset': {
                               //         borderColor: '#702DFF', // <------------------ outline-color on hover
                               //     },
                               //     '&.Mui-focused fieldset': {
                               //         borderColor: '#702DFF', // <------------------ outline-color on focus
                               //     },
                               // },
                           }}
                />
                <div className="ml-7">
                    <Fab size="small" color="primary" aria-label="add"
                    sx={{
                        bgcolor: "#702DFF",

                    }
                    }>
                        <SendIcon />
                    </Fab>
                </div>
            </div>
        </div>
    )
}