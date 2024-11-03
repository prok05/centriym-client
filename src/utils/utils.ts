import {format, differenceInHours, differenceInDays} from 'date-fns';
import moment from 'moment';

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
    return format(date, 'EEE. HH:mm', {locale: 'ru'});
    // Если больше 7 дней назад, форматируем в стиль "Вт. 14:05"
};

export const getCurrentMonth = () => {
    const months = new Map()
    months.set(0, "01")
    months.set(1, "02")
    months.set(2, "03")
    months.set(3, "04")
    months.set(4, "05")
    months.set(5, "06")
    months.set(6, "07")
    months.set(7, "08")
    months.set(8, "09")
    months.set(9, "10")
    months.set(10, "11")
    months.set(11, "12")

    const month = new Date().getMonth()
    return months.get(month)
}

export const getStartAndEndDate = (date: Date) => {
    let month = moment(date).month()
    let startDate = moment([date.getFullYear(), month])
    let endDate = moment(startDate).endOf('month')

    return [moment(startDate).format("YYYY-MM-DD"), moment(endDate).format("YYYY-MM-DD")]
}

export const getEventsFromLessons = (lessons) => {
    if (lessons !== null) {
        return lessons.map((lesson) => {
            return {
                title: getSubjectName(lesson.subject_id),
                start: moment(lesson.time_from).toDate(),
                end: moment(lesson.time_to).toDate(),
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
