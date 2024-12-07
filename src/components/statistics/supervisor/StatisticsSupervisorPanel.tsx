'use client'

import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LessonRating from "@/components/statistics/supervisor/LessonRating";
import {Statistic} from "@/components/statistics/supervisor/Statistic";

function StatisticsSupervisorPanel() {
    const [alignment, setAlignment] = React.useState<string>("lesson-rating");

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        console.log(typeof alignment)
    };

    return (
        <div className="flex flex-grow p-4 rounded-xl bg-white h-full border-2">
            <div className="flex flex-grow flex-col">
                <div className="flex justify-between px-4 pt-2">
                    <h2 className="text-2xl font-bold mb-4">Статистика</h2>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Statistics"
                        size={'small'}
                    >
                        <ToggleButton
                            value="lesson-rating"
                            sx={{
                                textTransform: 'none',
                            }}
                            className={`${
                                alignment === "lesson-rating"
                                    ? "!bg-gray-100 !text-black hover:!bg-gray-200"
                                    : "bg-transparent text-black hover:bg-gray-200 hover:text-black"
                            }`}
                        >Оценки уроков</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <Statistic statistic={alignment}/>
            </div>
        </div>
    );
}

export default StatisticsSupervisorPanel;