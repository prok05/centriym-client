'use client'
import React from 'react';
import HomeworkListStudent from "@/components/homework/student/HomeworkListStudent";
import moment from 'moment'
import {useInnerUserStore} from "@/store/innerUserStore";
import HomeworkListTeacher from "@/components/homework/teacher/HomeworkListTeacher";
import CircularProgress from '@mui/material/CircularProgress';
moment.locale("ru");

const HomeworkPanel: React.FC = () => {
    const user = useInnerUserStore((state) => state.innerUser);

    const showList = (user) => {
        if (user.role == "teacher") {
            return <HomeworkListTeacher />
        } else if (user.role == "student") {
            return <HomeworkListStudent />
        }
    }

    if (!user) {
        return (
            <div className="flex flex-grow rounded-xl bg-white h-full border-2 p-4 overflow-hidden">
                <div className="flex flex-grow flex-col overflow-y-scroll">
                    <h2 className="text-2xl font-bold mb-4">Домашняя работа</h2>
                    <div className="flex items-center justify-center h-full">
                        <CircularProgress color="secondary" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2 p-4 overflow-hidden">
            <div className="flex flex-grow flex-col overflow-y-scroll">
                <h2 className="text-2xl font-bold mb-4">Домашняя работа</h2>
                {showList(user)}
            </div>
        </div>
    );
};

export default HomeworkPanel;