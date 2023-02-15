import React, { useEffect, useState } from 'react';
import data from '../data/views.json';
import View from '../components/View';
import styles from './history.module.scss';

const monthMap: string[] = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
];

type viewType = {
    created_at: string;
    viewed: boolean;
    employer: {
        id: string;
        name: string;
        logo_urls: {
            '90': string;
        };
    };
};

type timeAndStatus = {
    times: string[];
    viewed: boolean;
};

// Чтобы распределить просмотры по одинаковым дням привел исходную структуру данных к виду:
// во внешнем map ключ это дата а значение это внутренний map
type outerMap = Map<string, innerMap>;
// Во внутреннем map ключ это компания которая просматривала профиль
// а значение это массив в котором хранится время когда просматривали профиль
type innerMap = Map<string, timeAndStatus>;

const mapViews: outerMap = new Map();

// Получить время hh:mm
function getTime(creationTime: string): string {
    const date = new Date(creationTime);
    return date.getHours() + ':' + date.getMinutes();
}

// Получить дату yyyy-mm-dd
function getDate(creationTime: string): string {
    const date = new Date(creationTime);
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
}

// Получить дату для отображения в списке ("сегодня", "вчера", и т.д.)
function getDateHeading(creationDate: string): string {
    const date = new Date(creationDate);
    const dateNow = new Date();
    const [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
    const [currentDay, currentYear] = [dateNow.getDate(), dateNow.getFullYear()];

    if (year === currentYear) {
        if (currentDay - day <= 1) {
            if (currentDay - day === 0) {
                return 'Сегодня';
            } else {
                return 'Вчера';
            }
        } else {
            return day + ' ' + monthMap[month + 1];
        }
    } else {
        return day + ' ' + monthMap[month + 1] + ' ' + year;
    }
}

function History() {
    const temp = new Map();

    const [views, setViews] = useState<outerMap>(temp);

    useEffect(() => {
        const array = data.items;

        // Сортируем исходный массив чтобы самые новые просмотры отображались первыми
        array.sort((a: viewType, b: viewType) => {
            const aDate = new Date(a.created_at).getTime();
            const bDate = new Date(b.created_at).getTime();
            return bDate - aDate;
        });

        array.forEach((view) => {
            const date: string = getDate(view.created_at);
            const time: string = getTime(view.created_at);
            const employer = JSON.stringify(view.employer);
            const viewed: boolean = view.viewed;

            // Если в рассматриваемой дате уже были просмотры
            if (mapViews.has(date)) {
                const dayViews = mapViews.get(date);

                // и та же компания уже оставляла в этот день другие просмотры
                if (dayViews?.has(employer)) {
                    const viewInfo = dayViews.get(employer);
                    // то добавляем текущее время к массиву
                    viewInfo!.times.push(time);
                    viewInfo!.times.sort();
                    // если хоть одно из уведомлений не просмотрено,
                    // горит флаг "новое"
                    viewInfo!.viewed = viewInfo!.viewed && viewed;
                    dayViews.set(employer, viewInfo!);
                } else {
                    // если в рассматриваемый день компания не оставляла просмотров
                    // то добавляем во внутренний map эту компанию и время просмотра
                    dayViews?.set(employer, { times: [time], viewed });
                }
            } else {
                // Если в рассматриваемой дате еще не было ни одного просмотра
                // то создаем просмотр от компании во внутреннем map
                const dayViews: innerMap = new Map();
                dayViews.set(employer, { times: [time], viewed });
                // и добавляем новую дату ко внешнему map
                mapViews.set(date, dayViews);
            }
        });
        setViews(mapViews);
    }, []);

    return (
        <>
            {Array.from(views.keys()).map((date) => {
                return (
                    <>
                        <span key={'span' + date} className={styles.date}>
                            {getDateHeading(date)}
                        </span>
                        <ul key={'ul' + date} className={styles.viewsList}>
                            {Array.from(views.get(date)!.entries()).map(([employer, info]) => {
                                return (
                                    <li key={'li' + employer.toString()} className={styles.viewsItem}>
                                        <View employerJson={employer} viewsTimes={info.times} viewed={info.viewed} />
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                );
            })}
        </>
    );
}

export default History;
