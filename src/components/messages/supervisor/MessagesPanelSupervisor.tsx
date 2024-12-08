'use client'

import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StudentList from "@/components/messages/supervisor/StudentList";
import TeacherList from "@/components/messages/supervisor/TeacherList";

function MessagesPanelSupervisor(props) {
    const [alignment, setAlignment] = React.useState('students');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2">
            <div className="flex flex-col w-1/3 border-r-2 relative">
                <div className="flex justify-between items-center p-5 border-b-2">
                    <h2 className="font-bold">Сообщения</h2>
                </div>
                <div className="">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="User type"
                    >
                        <ToggleButton value="students">Ученики</ToggleButton>
                        <ToggleButton value="teachers">Преподаватели</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                {alignment === "students" && <StudentList />}
                {alignment === "teachers" && <TeacherList />}
            </div>
            <div className="w-2/3">

            </div>
        </div>
    );
}

export default MessagesPanelSupervisor;