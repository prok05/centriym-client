import moment from 'moment'
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import 'moment/locale/ru'
import {useMemo} from "react";

const localizer = momentLocalizer(moment)



export function LessonCalendar() {
    const {  defaultDate ,messages } = useMemo(
        () => ({
            defaultDate: Date.now(),
            messages: {
                week: 'Неделя',
                work_week: 'Semana de trabajo',
                day: 'День',
                month: 'Месяц',
                previous: 'Назад',
                next: 'Вперед',
                today: 'Сегодня',
                agenda: 'El Diario',
            },
        }),
        []
    )

    const events:Event[] = []

    return (
        <div className="h-full">
            <Calendar
                localizer={localizer}
                // defaultDate={defaultDate}
                events={events}
                culture={"ru"}
                messages={messages}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 300 }}
            />
        </div>
    )
}

