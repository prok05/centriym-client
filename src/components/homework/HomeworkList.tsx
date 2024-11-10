"use client";

import React from 'react';
import {getSubjectName} from "@/utils/utils";

interface HomeworkItem {
    id: number;
    subject_id: number;
    topic: string;
    homework : string;
    date : FormData;
}

interface HomeworkListProps {
    homework: HomeworkItem[];
}

// обработка клика начать
const HomeworkList: React.FC<HomeworkListProps> = ({ homework }) => {
    const handleStart = (id: number) => {
        console.log(`Начать выполнение задачи с ID: ${id}`);
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Домашняя работа</h2>
            <ul>
                {homework.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center py-2 border-b border-gray-200"
                    >
                        <span
                            className="text-gray-700">Урок: {getSubjectName(item.subject_id)}-{item.date}<br/>Тема: {item.topic}<br/>ДЗ: {item.homework}</span>

                        <button
                            onClick={() => handleStart(item.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                        >
                            Начать
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomeworkList;


