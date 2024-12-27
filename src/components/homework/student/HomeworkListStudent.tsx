"use client";

import React, {useState} from 'react';
import HomeworkItemLoading from "@/components/homework/HomeworkItemLoading";
import Stack from '@mui/material/Stack';
import moment from 'moment'
import HomeworkListItemStudent from "@/components/homework/student/HomeworkListItemStudent";
import {useUserID} from "@/hooks/useUserID";
import {useQuery} from "@tanstack/react-query";
import {getStartAndEndDate} from "@/utils/utils";


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
const HomeworkListStudent = () => {
    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['homeworks'],
        queryFn: () => fetchHomeworks(),
        staleTime: 1000
    })

    // @ts-ignore
    const fetchHomeworks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/student`, {
            method: "GET",
            credentials: "include",
        });

        return await response.json();
    };

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
                    {data.map((homework) => (
                        <HomeworkListItemStudent key={homework.id} homework={homework}/>
                    ))}
                </Stack>
            </div>
        </div>
    )
        ;
};

export default HomeworkListStudent;


