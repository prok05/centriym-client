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

export default formatDate;
