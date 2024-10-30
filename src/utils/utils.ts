import {format, differenceInHours, differenceInDays} from 'date-fns';

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

export default formatDate;
