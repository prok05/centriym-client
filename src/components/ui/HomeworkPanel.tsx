"use client";
import React, {useEffect, useState} from 'react';
import HomeworkList from "@/components/homework/HomeworkList";
import {useUserID} from "@/hooks/useUserID";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import moment from 'moment'
import {getStartAndEndDate} from "@/utils/utils";


moment.locale("ru");

const HomeworkPanel: React.FC = () => {
    const userID = useUserID();
    // const [lessonsWithHomework, setLessonsWithHomework] = useState([]);
    const [date, setDate] = useState<Date>(moment().toDate());

    const {data, error, isPlaceholderData, isLoading, isPending} = useQuery({
        queryKey: ['homework'],
        queryFn: () => getLessonsWithHomeWork(userID, date),
        enabled: !!userID,
    })

    // @ts-ignore
    const getLessonsWithHomeWork = async (userID, date) => {
        let [start, end] = getStartAndEndDate(date)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/future`, {
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


    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Домашняя работа</h2>
            <HomeworkList data={data} error={error} isPending={isPending}/>
        </div>
    );
};

export default HomeworkPanel;