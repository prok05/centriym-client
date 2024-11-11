"use client";

import React from 'react';
import {getSubjectName} from "@/utils/utils";
import HomeworkItemLoading from "@/components/homework/HomeworkItemLoading";
import Stack from '@mui/material/Stack';
import {Divider, Typography} from "@mui/material";
import moment from 'moment'




interface HomeworkItem {
    id: number;
    subject_id: number;
    topic: string;
    homework: string;
    date: FormData;
}

interface HomeworkListProps {
    homework: HomeworkItem[];
}

moment.locale("ru");

// @ts-ignore
const HomeworkList = ({data, error, isPending}) => {
    const handleStart = (id: number) => {
        console.log(`Начать выполнение задачи с ID: ${id}`);
    };

    if (isPending) {
        return (
            <Stack className="bg-white p-6 rounded-lg shadow-md">
                <HomeworkItemLoading/>
                <HomeworkItemLoading/>
                <HomeworkItemLoading/>
                <HomeworkItemLoading/>
                <HomeworkItemLoading/>
                <HomeworkItemLoading/>
                <HomeworkItemLoading/>
            </Stack>
        )
    }


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <Stack spacing={3}>
                {/*@ts-ignore*/}
                {data.map((item) => (
                    <div className="flex justify-between items-center p-4 border border-slate-200 rounded">
                        <div className="flex flex-col w-4/5">
                            <Typography
                                variant="h5">{getSubjectName(item.subject_id)}: {moment(item.date).format("dddd, DD MMMM")}</Typography>
                            <Divider />
                            <Typography variant="body1">Тема: {item.topic}</Typography>
                            <Typography variant="body1">ДЗ: {item.homework}</Typography>
                        </div>
                        <div>
                            <button
                                onClick={() => handleStart(item.id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                            >Начать
                            </button>
                        </div>
                    </div>
                ))}
            </Stack>
        </div>
    )
        ;
};

export default HomeworkList;


