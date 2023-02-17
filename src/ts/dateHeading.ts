import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');
function dateHeading(date: string): string {
    const formattedDate = dayjs(date);
    const dateNow = dayjs();
    if (formattedDate.year() !== dateNow.year()) {
        return formattedDate.format('D MMMM YYYY');
    }

    if (formattedDate.month() !== dateNow.month()) {
        return formattedDate.format('D MMMM');
    }

    if (dateNow.date() - formattedDate.date() > 1) {
        return formattedDate.format('D MMMM');
    }

    return formattedDate.date() === dateNow.date() ? 'Сегодня' : 'Вчера';
}

export default dateHeading;
