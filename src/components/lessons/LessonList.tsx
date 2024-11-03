'use client'

import {useUserID} from "@/hooks/useUserID";
import moment from 'moment'
import {LessonI} from "@/lib/types";
import {useEffect, useState} from "react";
import {LessonItem} from "@/components/lessons/LessonItem";
import {useLessonStore} from "@/store/lessonStore";
import {getCurrentMonth, getEventsFromLessons, getStartAndEndDate} from "@/utils/utils";
import {LessonCalendar} from "@/components/lessons/LessonCalendar";
import {Views} from "react-big-calendar";


export function LessonList() {
    const userID = useUserID()
    const lessons = useLessonStore((state) => state.lessons);
    const setLessons = useLessonStore((state) => state.setLessons);

    const [date, setDate] = useState<Date>(moment().toDate());


    useEffect(() => {
        // if (lessons) return;

        if (userID && date) {
            let [start, end] = getStartAndEndDate(date)
            console.log("Получаем за", moment(date).month())

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/future`, {
                method: "POST",
                body: JSON.stringify({
                    "customer_id": userID,
                    "date_from": start,
                    "date_to": end,
                    "page": 0
                })
            })
                .then(response => response.json())
                .then((data) => {
                    setLessons(data.items)
                    console.log(data.items)
                })
        }

    }, [userID, setLessons, date]);


    return (
        <div className="flex flex-col h-full">
            <div className="h-full p-4">
                <LessonCalendar date={date} setDate={setDate} />
            </div>

            {/*<div className="flex flex-wrap overflow-y-auto">*/}
            {/*    {lessons?.map((lesson) => (*/}
            {/*        <LessonItem key={lesson.id} lesson={lesson}/>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    )
}

