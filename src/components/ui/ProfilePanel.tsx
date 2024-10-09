'use client'

import {useUser} from "@/hooks/useUser";
import {Avatar, Skeleton} from "@mui/material";
import {deepPurple} from '@mui/material/colors';

export function ProfilePanel() {
    const {user, error, isLoading} = useUser();

    const firstName = user?.name.split(" ")[1]
    const lastName = user?.name.split(" ")[0]

    if (error) {
        return <p>Ошибка: {error}</p>; // Отображаем сообщение об ошибке
    }

    // @ts-ignore
    return (
        <div className="flex flex-col w-1/6 flex-grow py-2 px-5 shadow-[-4px_0_8px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col flex-grow items-center py-2 px-4">
                {isLoading ? (
                        <div className="flex flex-col flex-grow items-center py-8 px-4">
                            <div className="mb-4">
                                <Skeleton variant="circular" width={56} height={56}/>
                            </div>
                            <div className="mb-3 w-full">
                                <Skeleton width="100%" variant="text" sx={{ fontSize: '1rem' }} />
                            </div>
                            <div className="flex flex-col items-center w-full">
                                <Skeleton width="100%" variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton width="100%" variant="text" sx={{ fontSize: '1rem' }} />
                            </div>
                        </div>
                    )
                    : (
                        <div className="flex flex-col flex-grow items-center py-8 px-4">
                            <div className="mb-4">
                                {/*@ts-ignore*/}
                                <Avatar className="mb-2" sx={{bgcolor: '#702dff', width: 56, height: 56}}>
                                    {/*@ts-ignore*/}
                                    {firstName[0]}{lastName[0]}
                                </Avatar>
                            </div>
                            <div className="mb-3">
                                <p className="font-medium text-l">{firstName} {lastName}</p>
                                <p className="text-sm text-gray-500">ID: {user?.id}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500">Баланс</p>
                                <p className="text-sm">{user?.balance} ₽</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}