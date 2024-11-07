import moment from 'moment';

moment.locale("ru");


// @ts-ignore
export function CalendarEvent({event}) {
    const lessonColor = () => {
        if (event.status === 1)  {
            return "bg-green-200"
        } else if (event.status === 2) {
            return "bg-red-200"
        } else if (event.status === 3) {
            return "bg-gray-200"
        }
    }

    return (
        <div className={`${lessonColor()} rounded-full`}>
            <div className="text-sm text-gray-700 text-center px-1">{event.title} {event.hour}</div>
        </div>
    )
}