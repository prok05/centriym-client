import React from 'react';
import LessonRating from "@/components/statistics/supervisor/LessonRating";

interface StatisticProp {
    statistic: string
}

export function Statistic({statistic}: StatisticProp) {
    switch (statistic) {
        case 'lesson-rating':
            return <LessonRating/>
        default:
            return null
    }
}

