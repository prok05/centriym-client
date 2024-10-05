export interface LessonI  {
    id: number
    lessonType: number
    date: string
    time_from: string
    time_to: string
    subjectName: string
    streaming: string[]
}

export interface ChatI {
    id: number
    chatType: string
    name: string
    createdAt: string
}