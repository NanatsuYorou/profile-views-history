import getDateHeading from '../getDateHeading';
import dayjs from 'dayjs';

describe('Форматирование даты', () => {
    test('корректно распознает сегодняшнюю дату', () => {
        expect(getDateHeading(dayjs())).toBe('Сегодня');
    });
    test('корректно распознает вчерашнюю дату', () => {
        expect(getDateHeading(dayjs().subtract(1, 'day'))).toBe('Вчера');
    });
    test('корректно форматирует дату этого года', () => {
        expect(getDateHeading('2023-01-17T11:43:00+0300')).toBe('17 января');
    });
    test('корректно форматирует дату другого года', () => {
        expect(getDateHeading('2022-01-17T11:43:00+0300')).toBe('17 января 2022');
    });
});
