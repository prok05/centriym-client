"use client";

import React, {useState} from 'react';
import HomeworkItemLoading from "@/components/homework/HomeworkItemLoading";
import Stack from '@mui/material/Stack';
import moment from 'moment'
import {useUserID} from "@/hooks/useUserID";
import {useQuery} from "@tanstack/react-query";
import {getStartAndEndDate} from "@/utils/utils";
import HomeworkListItemTeacher from "@/components/homework/teacher/HomeworkListItemTeacher";

// @ts-ignore
const HomeworkListTeacher = () => {
    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['homework'],
        queryFn: () => fetchHomeworks(),
    })

    // @ts-ignore
    const fetchHomeworks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/teacher`, {
            method: "GET",
            credentials: "include",
        });

        return await response.json()
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
                {/*<button onClick={() => console.log(data)}>Click</button>*/}
                {!data.length && <div>Нет домашних заданий</div>}
                <Stack spacing={3}>
                    {/*@ts-ignore*/}
                    {data.map((homework) => (
                        <HomeworkListItemTeacher key={homework.id} homework={homework}/>
                    ))}
                </Stack>
            </div>
        </div>
    )
        ;
};

export default HomeworkListTeacher;


