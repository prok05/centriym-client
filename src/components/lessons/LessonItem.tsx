'use client'

import {LessonI} from "@/lib/types";
import {Card, CardContent, Typography} from "@mui/material";


interface Props {
    lesson: LessonI
}

export function LessonItem(props: Props) {

    return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        ID: {props.lesson.id}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Дата: {props.lesson.date}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Начало: {props.lesson.time_from}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Конец: {props.lesson.time_to}
                    </Typography>
                    <Typography variant="body2">
                        Предмет: {props.lesson.subjectName}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Ссылка: {props.lesson.streaming == null ? 'Нет' : props.lesson.streaming[0]}
                        <br/>
                    </Typography>
                </CardContent>
            </Card>
    )
}