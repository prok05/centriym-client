'use client'
import React from 'react';
import HomeworkListStudent from "@/components/homework/student/HomeworkListStudent";
import moment from 'moment'
moment.locale("ru");

const HomeworkPanelStudent: React.FC = () => {
    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2 p-4 overflow-hidden">
            <div className="flex flex-grow flex-col overflow-y-scroll">
                <h2 className="text-2xl font-bold mb-4">Домашняя работа</h2>
                <HomeworkListStudent />
            </div>
        </div>
    );
};

export default HomeworkPanelStudent;