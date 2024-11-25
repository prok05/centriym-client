'use client'

import {useUserID} from "@/hooks/useUserID";
import moment from 'moment'
import {useState} from "react";
import {useLessonStore} from "@/store/lessonStore";
import { getStartAndEndDate} from "@/utils/utils";
import {LessonCalendar} from "@/components/lessons/LessonCalendar";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useInnerUserStore} from "@/store/innerUserStore";


export function LessonList() {
    const userID = useUserID()
    const innerUser = useInnerUserStore((state) => state.innerUser);
    const lessons = useLessonStore((state) => state.lessons);
    const setLessons = useLessonStore((state) => state.setLessons);
    const [date, setDate] = useState<Date>(moment().toDate());

    const {data: userInfo, error: userError, isPending: userPending} = useQuery({
        queryKey: ['userInfo', date],
        queryFn: () => getUser(userID),
        enabled: Boolean(userID),
        placeholderData: keepPreviousData
    })

    // @ts-ignore
    const getUser = async (id) => {
        // @ts-ignore
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/alpha/users/${id}`, {
            method: "GET",
            credentials: "include"
        })
        if (!response.ok) {
            throw new Error('Не смогли получить юзера')
        }
        return response.json()
    }

    // @ts-ignore
    const getLessons = async (id, date, user) => {
        let [start, end] = getStartAndEndDate(date)
        let body;
        let url;
        if (user.role === "student") {
            body = {
                "customer_id": id,
                "date_from": start,
                "date_to": end,
                "page": 0
            }
            url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/student`
        } else if (user.role === "teacher") {
            body = {
                "teacher_id": userID,
                "date_from": start,
                "date_to": end,
                "page": 0
            }
            url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/teacher`
        }
        // @ts-ignore
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include"
        })
        if (!response.ok) {
            throw new Error('Не смогли получить уроки')
        }
        return response.json()

    }

    const {data, isPlaceholderData, isPending} = useQuery({
        queryKey: ['lessons', date],
        queryFn: () => getLessons(userID, date, userInfo),
        // enabled: !!userID && innerUser,
        enabled: Boolean(userInfo),
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

