import {LessonList} from "@/components/lessons/LessonList";

// @ts-ignore
export function LessonsPanel({user}) {
    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2">
            <div className="flex flex-col flex-grow">
                <LessonList user={user} />
            </div>
        </div>
    )
}