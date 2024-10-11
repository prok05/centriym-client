import CloseIcon from '@mui/icons-material/Close';
import {Suspense, useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import {teachersResource} from "@/resources/resources";
import {useInnerUserStore} from "@/store/innerUserStore";
import {InnerUserI} from "@/lib/types";

export default function NewChat({setIsCreatingChat, setSelectedUser}) {
    const innerUser = useInnerUserStore((state) => state.innerUser)

    function createChat()

    function TeacherList() {
        if (innerUser) {
            let users;
            if (innerUser?.role == "student") {
                users = teachersResource.read()
                return (
                    <ul>
                        {users.map((user) => {
                            return <li
                                onClick={() => setSelectedUser(user.id)}
                                className="p-2 hover:bg-purple-sec cursor-pointer transition-colors"
                                key={user.id}>{user.first_name} {user.last_name}</li>
                        })}
                    </ul>
                )
            }
        }
    }

    return (
        <div className="p-5 absolute top-0 left-0 w-full rounded-xl h-full bg-white z-10 ">
            <div className="flex justify-between mb-5">
                <div className="font-bold">Новый чат</div>
                <button className="w-[26px] h-[23px]"
                        onClick={() => {
                            setIsCreatingChat(prev => !prev)
                            setSelectedUser(null)
                        }}>
                    <CloseIcon/>
                </button>
            </div>
            <div>
                <div className="mb-2 pb-1 border-b-2">Список преподавателей</div>
                <div>
                    <Suspense fallback={<CircularProgress color={"secondary"}/>}>
                        <TeacherList />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}