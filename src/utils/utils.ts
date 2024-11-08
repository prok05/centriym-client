import {format, differenceInHours, differenceInDays} from 'date-fns';
import moment from 'moment';

// @ts-ignore
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffHours = differenceInHours(now, date);
    const diffDays = differenceInDays(now, date);

    if (diffDays === 0) {
        return `${diffHours}ч назад`; // Сегодня
    } else if (diffDays === 1) {
        return '1д'; // Вчера
    } else if (diffDays > 1 && diffDays <= 7) {
        return `${diffDays}д`; // Количество дней назад
    }
    // @ts-ignore
    return format(date, 'EEE. HH:mm', {locale: 'ru'});
    // Если больше 7 дней назад, форматируем в стиль "Вт. 14:05"
};

export const getStartAndEndDate = (date: Date) => {
    let month = moment(date).month()
    let startDate = moment([date.getFullYear(), month])
    let endDate = moment(startDate).endOf('month')

    return [moment(startDate).format("YYYY-MM-DD"), moment(endDate).format("YYYY-MM-DD")]
}

// @ts-ignore
export const getEventsFromLessons = (lessons) => {
    if (lessons !== null) {
        // @ts-ignore
        return lessons.map((lesson) => {
            return {
                title: getSubjectName(lesson.subject_id),
                topic: lesson.topic,
                note: lesson.note,
                status: lesson.status,
                streaming: lesson.streaming,
                start: moment(lesson.time_from).toDate(),
                end: moment(lesson.time_to).toDate(),
                hourStart: moment(lesson.time_from).format("HH:mm"),
                hourEnd: moment(lesson.time_to).format("HH:mm"),
            }
        })
    }
}

export const getSubjectName = (id: number) => {
    switch (id) {
        case 19: return 'Математика';
        case 28: return 'Английский';
        case 20: return 'Русский язык';
        case 21: return 'Литература'
        case 24: return 'Биология';
        case 25: return 'Химия';
        case 26: return 'История';
        case 27: return 'Обществознание';
        case 22: return 'Физика';
        case 23: return 'Информатика';
        case 31: return 'География';
        case 32: return 'Программирование';
        case 53: return 'Подготовка к Олимпиаде';
        case 56: return 'ПРОФОРИЕНТАЦИЯ';
        case 60: return 'Окружающий мир';
        case 59: return 'Логопедия';
    }
}

export default formatDate;
