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
    const userID = useUserID();
    const [date, setDate] = useState<Date>(moment().toDate());

    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['homework'],
        queryFn: () => getLessonsWithHomeWork(userID, date),
        enabled: !!userID,
        staleTime: 1000
    })

    // @ts-ignore
    const getLessonsWithHomeWork = async (userID, date) => {
        let [start, end] = getStartAndEndDate(date)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/homework/student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "customer_id": userID,
                "date_from": start,
                "date_to": end,
                "page": 0
            })
        });

        const data = await response.json();
        const filteredLessons = data.items.filter((lesson: {
            homework: string
        }) => lesson.homework && lesson.homework.trim() !== "");

        // @ts-ignore
        return filteredLessons as Promise
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
                    {data.map((item) => (
                        <HomeworkListItemStudent key={item.id} item={item}/>
                    ))}
                </Stack>
            </div>
        </div>
    )
        ;
};

export default HomeworkListStudent;


