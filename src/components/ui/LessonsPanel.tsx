import {LessonList} from "@/components/lessons/LessonList";
import {getCurrentMonth} from "@/utils/utils";
import {useEffect} from "react";

export function LessonsPanel() {
    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2">
            <div className="flex flex-col flex-grow">
                <LessonList />
            </div>
        </div>
    )
}