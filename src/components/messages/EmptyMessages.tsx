import React from 'react';
import {Typography} from "@mui/material";

function EmptyMessages() {
    return (
        <div className="flex justify-center items-center h-full">
            <Typography>Напишите сообщение</Typography>
        </div>
    );
}

export default EmptyMessages;