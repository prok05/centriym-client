"use client";

import React from 'react';
import HomeworkItemLoading from "@/components/homework/HomeworkItemLoading";
import Stack from '@mui/material/Stack';
import moment from 'moment'
import HomeworkListItem from "@/components/homework/HomeworkListItem";


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
    if (isPending) {
        return (
            <Stack spacing={3} className="bg-white p-6 rounded-lg shadow-md">
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

    if (error) {
        return <div>Не удалось загрузить домашние задания</div>
    }


    return (
        <div className="flex flex-col h-full">
            <div className="h-full">
                <Stack spacing={3}>
                    {/*@ts-ignore*/}
                    {data.map((item) => (
                        <HomeworkListItem key={item.id} item={item} />
                    ))}
                </Stack>
            </div>
        </div>
    )
        ;
};

export default HomeworkList;


