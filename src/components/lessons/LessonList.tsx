'use client'

import {useUserID} from "@/hooks/useUserID";
import LessonI from "@/lib/types";
import {useEffect, useState} from "react";
import {LessonItem} from "@/components/lessons/LessonItem";
import {useLessonStore} from "@/store/lessonStore";


export function LessonList() {
    const userID = useUserID()
    const lessons = useLessonStore((state) => state.lessons);
    const setLessons = useLessonStore((state) => state.setLessons)

    useEffect(() => {
        if (lessons) return;

        if (userID) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/future`, {
                method: "POST",
                body: JSON.stringify({
                    "customer_id": userID,
                    "status": 1,
                    "page": 0
                })
            })
                .then(response => response.json())
                .then((data) => {
                    setLessons(data.items)
                })
        }

    }, [userID, lessons, setLessons]);


    return (
        <div className="flex flex-col flex-grow min-h-0">
            <div className="flex flex-wrap overflow-y-auto">
                {lessons?.map((lesson) =>  (
                    <LessonItem key={lesson.id} lesson={lesson}/>
                ))}
            </div>
        </div>
    )
}

