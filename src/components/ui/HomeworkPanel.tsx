"use client";
import React, { useEffect, useState } from 'react';
import HomeworkList from "@/components/homework/HomeworkList";
import { useUserID } from "@/hooks/useUserID";

const HomeworkPanel: React.FC = () => {
    const userID = useUserID();
    const [lessonsWithHomework, setLessonsWithHomework] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
            const currentDate = new Date();
            const startDate = new Date(currentDate);
            startDate.setDate(startDate.getDate() - 14);
            const endDate = new Date(currentDate);
            endDate.setDate(endDate.getDate() + 14);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/future`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "customer_id": userID,
                    "date_from": startDate.toISOString().split("T")[0],
                    "date_to": endDate.toISOString().split("T")[0],
                    "page": 0
                })
            });

            const data = await response.json();
            const filteredLessons = data.items.filter((lesson: { homework: string }) => lesson.homework && lesson.homework.trim() !== "");

            setLessonsWithHomework(filteredLessons);
        };

        // Запуск запроса при загрузке userID
        if (userID !== null) {
            fetchLessons();
        }

        // Установка интервала на 3 минуты (180000 мс)
        const intervalId = setInterval(() => {
            if (userID !== null) {
                fetchLessons();
            }
        }, 180000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);

    }, []); // Запрос обновляется при изменении userID

    return (
        <div className="container mx-auto mt-10">
            <HomeworkList homework={lessonsWithHomework} />
        </div>
    );
};

export default HomeworkPanel;