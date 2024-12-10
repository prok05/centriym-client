'use client'

import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StudentList from "@/components/messages/supervisor/StudentList";
import TeacherList from "@/components/messages/supervisor/TeacherList";
import UserChats from "@/components/messages/supervisor/UserChats";

function MessagesPanelSupervisor(props) {
    const [alignment, setAlignment] = React.useState('students');
    const [selectedUser, setSelectedUser] = React.useState(null)

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <div className="flex flex-grow rounded-xl bg-white h-full border-2">
            <div className="flex flex-col w-1/3 border-r-2 relative">
                <div className="flex justify-center mt-4 mb-4">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="User role"
                        size="small"
                    >
                        <ToggleButton
                            sx={{
                                textTransform: 'none',
                            }}
                            className={`${
                                alignment === "students"
                                    ? "!bg-purple-pale !text-black hover:!bg-purple-sec"
                                    : "bg-transparent text-black hover:bg-gray-200 hover:text-black"
                            }`}
                            value="students">Ученики</ToggleButton>
                        <ToggleButton
                            sx={{
                                textTransform: 'none',
                            }}
                            className={`${
                                alignment === "teachers"
                                    ? "!bg-purple-pale !text-black hover:!bg-purple-sec"
                                    : "bg-transparent text-black hover:bg-gray-200 hover:text-black"
                            }`}
                            value="teachers">Преподаватели</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                {alignment === "students" && <StudentList setSelectedUser={setSelectedUser}/>}
                {alignment === "teachers" && <TeacherList setSelectedUser={setSelectedUser}/>}
            </div>
            <div className="w-2/3">
                {selectedUser ? <UserChats selectedUser={selectedUser}/> : <div className="flex justify-center items-center h-full">Выберите пользователя</div>}
            </div>
        </div>
    );
}

export default MessagesPanelSupervisor;