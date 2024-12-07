import moment from 'moment'
import {Calendar, momentLocalizer, Event, Views} from 'react-big-calendar'
import 'moment/locale/ru'
import {SetStateAction, useCallback, useMemo, useState} from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import HelpIcon from '@mui/icons-material/Help';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import {getEventsFromLessons} from "@/utils/utils";
import {CalendarEvent} from "@/components/lessons/CalendarEvent";
import {Button, LinearProgress} from "@mui/material";
import LessonHelpTooltip from "@/components/lessons/LessonHelpTooltip";
import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const localizer = momentLocalizer(moment)
moment.locale("ru");
type Keys = keyof typeof Views;

const VIEW_OPTIONS = [
    {id: Views.MONTH, label: "Месяц"},
    {id: Views.WEEK, label: "Неделя"},
    {id: Views.DAY, label: "День"},
];

// @ts-ignore
export function LessonCalendar({date, setDate, data, isPlaceholderData, isPending, user}) {
    const [view, setView] = useState<(typeof Views)[Keys]>(Views.MONTH);
    // const lessons = useLessonStore((state) => state.lessons);

    const {defaultDate, messages} = useMemo(
        () => ({
            defaultDate: Date.now(),
            messages: {
                week: 'Неделя',
                day: 'День',
                month: 'Месяц',
                previous: 'Назад',
                next: 'Вперед',
                today: 'Сегодня',
            },
        }),
        []
    )

    const dateText = useMemo(() => {
        if (view === Views.DAY) return moment(date).format("dddd, D MMMM");
        if (view === Views.WEEK) {
            const from = moment(date)?.startOf("week");
            const to = moment(date)?.endOf("week");
            return `${from.format("D MMMM")} - ${to.format("D MMMM")}`;
        }
        if (view === Views.MONTH) {
            return moment(date).format("MMMM, YYYY");
        }
    }, [view, date]);

    const onPrevClick = useCallback(() => {
        if (view === Views.DAY) {
            setDate(moment(date).subtract(1, "d").toDate());
        } else if (view === Views.WEEK) {
            setDate(moment(date).subtract(1, "w").toDate());
        } else {
            setDate(moment(date).subtract(1, "M").toDate());
        }
    }, [view, date]);

    const onNextClick = useCallback(() => {
        if (view === Views.DAY) {
            setDate(moment(date).add(1, "d").toDate());
        } else if (view === Views.WEEK) {
            setDate(moment(date).add(1, "w").toDate());
        } else {
            setDate(moment(date).add(1, "M").toDate());
        }
    }, [view, date]);

    const onTodayClick = useCallback(() => {
        setDate(moment().toDate());
    }, []);

    const [selected, setSelected] = useState();
    const handleSelected = (event: SetStateAction<undefined>) => {
        setSelected(event);
        console.info('[handleSelected - event]', event);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="relative">
                <div className="flex justify-between p-1">
                    <div className="flex items-center mx-auto">
                        <button className="mr-6" onClick={onPrevClick}><NavigateBeforeIcon fontSize="large"/></button>
                        <div className="bg-[#702DFF14] py-2 px-4 rounded-xl">
                            <span>{dateText}</span>
                        </div>
                        <button className="ml-6" onClick={onNextClick}><NavigateNextIcon fontSize="large"/></button>

                        <LessonHelpTooltip title={
                            <React.Fragment>
                                <div className="flex flex-col">
                                    <div className="bg-gray-200 p-2">Прошедший урок</div>
                                    <div className="bg-red-200 p-2">Отмененный урок</div>
                                    <div className="bg-green-200 p-2">Запланированный урок</div>
                                </div>
                            </React.Fragment>
                        }>
                            <button className="ml-6"><HelpIcon sx={{
                                color: "#959595"
                            }}/></button>
                        </LessonHelpTooltip>

                    </div>
                    <div>
                        <ToggleButtonGroup
                            color="primary"
                            value={view}
                            exclusive
                            aria-label="Platform"
                        >
                            {VIEW_OPTIONS.map(({ id, label }) => (
                                <ToggleButton
                                    value={label}
                                    onClick={() => setView(id)}
                                    sx={{textTransform: 'capitalize'}}
                                    className={`px-4 py-2 rounded ${
                                        id === view
                                            ? "bg-gray-200 text-black hover:bg-secondary"
                                            : "bg-transparent text-black hover:bg-gray-200 hover:text-black"
                                    }`}
                                >{label}</ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                        {/*{VIEW_OPTIONS.map(({ id, label }) => (*/}
                        {/*    <Button*/}
                        {/*        onClick={() => setView(id)}*/}
                        {/*        className={`px-4 py-2 rounded ${*/}
                        {/*            id === view*/}
                        {/*                ? "bg-gray-200 text-black hover:bg-secondary"*/}
                        {/*                : "bg-transparent text-black hover:bg-gray-200 hover:text-black"*/}
                        {/*        }`}*/}
                        {/*    >*/}
                        {/*        {label}*/}
                        {/*    </Button>*/}
                        {/*))}*/}
                        <button className="px-4 py-2 bg-purple-main text-white ml-2"
                                onClick={onTodayClick}>Сегодня
                        </button>
                    </div>
                </div>
                {isPending && <div className="absolute w-full"><LinearProgress color="secondary"/></div>}
            </div>
            <div className={"h-full overflow-y-auto relative" +
                (isPlaceholderData ? " opacity-30" : "") + (isPending ? " opacity-30" : "")}>

                <Calendar
                    localizer={localizer}
                    defaultView={Views.MONTH}
                    events={data ? getEventsFromLessons(data.items) : []}
                    selected={selected}
                    culture={"ru"}
                    messages={messages}
                    startAccessor="start"
                    endAccessor="end"
                    toolbar={false}
                    onNavigate={setDate}
                    date={date}
                    view={view}
                    components={{
                        month: {
                            event: (props) => <CalendarEvent {...props} view={view} user={user} />,
                        },
                        week: {
                            event: (props) => <CalendarEvent {...props} view={view} user={user} />,
                        },
                        day: {
                            event: (props) => <CalendarEvent {...props} view={view} user={user} />,
                        },
                    }}
                    showAllEvents={true}
                />
            </div>
        </div>

    )
}

