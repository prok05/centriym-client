import {LessonList} from "@/components/lessons/LessonList";

export function LessonsPanel() {
    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2">
            <div className="flex flex-col flex-grow">
                <LessonList />
            </div>
        </div>
    )
}