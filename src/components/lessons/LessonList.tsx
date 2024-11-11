'use client'

import {useUserID} from "@/hooks/useUserID";
import moment from 'moment'
import {useState} from "react";
import {useLessonStore} from "@/store/lessonStore";
import { getStartAndEndDate} from "@/utils/utils";
import {LessonCalendar} from "@/components/lessons/LessonCalendar";
import {keepPreviousData, useQuery} from "@tanstack/react-query";


export function LessonList() {
    const userID = useUserID()
    const lessons = useLessonStore((state) => state.lessons);
    const setLessons = useLessonStore((state) => state.setLessons);

    const [date, setDate] = useState<Date>(moment().toDate());

    // @ts-ignore
    const getLessons = async (id, date) => {
        let [start, end] = getStartAndEndDate(date)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/future`, {
            method: "POST",
            body: JSON.stringify({
                "customer_id": userID,
                "date_from": start,
                "date_to": end,
                "page": 0
            })
        })
        if (!response.ok) {
            throw new Error('Не смогли получить уроки')
        }
        return response.json()

    }

    const {data, error, isPlaceholderData, isLoading, isPending} = useQuery({
        queryKey: ['lessons', date],
        queryFn: () => getLessons(userID, date),
        enabled: !!userID,
        placeholderData: keepPreviousData
    })

    return (
        <div className="flex flex-col h-full">
            <div className="h-full p-4">
                <LessonCalendar
                    date={date}
                    setDate={setDate}
                    data={data}
                    isPlaceholderData={isPlaceholderData}
                    isPending={isPending}
                />
            </div>
        </div>
    )
}

