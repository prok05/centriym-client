'use client';

import {Skeleton} from "@mui/material";

export default function ChatListLoadingItem() {
    return (
        <div className="flex px-4 py-4">
            <div className="mr-5">
                <Skeleton variant="circular" width={50} height={50}/>
            </div>
            <div className="flex flex-col w-2/4">
                <Skeleton width="100%" variant="text" sx={{fontSize: '1rem'}}/>
                <Skeleton width="100%" variant="text" sx={{fontSize: '1rem'}}/>
            </div>
            <div className="ml-auto w-1/6">
                <Skeleton width="100%" variant="text" sx={{fontSize: '1rem'}}/>
            </div>
        </div>
    )
}