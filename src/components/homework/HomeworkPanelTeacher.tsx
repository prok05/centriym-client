'use client'
import React from 'react';
import moment from 'moment'
import HomeworkListTeacher from "@/components/homework/teacher/HomeworkListTeacher";
moment.locale("ru");

const HomeworkPanelTeacher: React.FC = () => {
    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2 p-4 overflow-hidden">
            <div className="flex flex-grow flex-col overflow-y-scroll">
                <h2 className="text-2xl font-bold mb-4">Домашняя работа</h2>
                <HomeworkListTeacher />
            </div>
        </div>
    );
};

export default HomeworkPanelTeacher;