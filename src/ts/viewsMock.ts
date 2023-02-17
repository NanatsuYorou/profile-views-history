import dayjs from 'dayjs';
import dateHeading from './dateHeading';
import { ViewInitialInfo, ViewMockedInfo } from '../types/interfaces';

const viewsMock = function (data: ViewInitialInfo[]): ViewMockedInfo {
    const views = {} as ViewMockedInfo;

    const dataArray = [...data].sort((a, b) => {
        if (dayjs(a.createdAt).year() === dayjs(b.createdAt).year()) {
            return dayjs(b.createdAt).millisecond() - dayjs(a.createdAt).millisecond();
        }
        return dayjs(b.createdAt).year() - dayjs(a.createdAt).year();
    });

    console.log(dataArray);

    let formattedTime = '';
    let formattedDate = '';

    dataArray.reduce((views, current) => {
        formattedTime = dayjs(current.createdAt).format('HH:mm');
        formattedDate = dateHeading(current.createdAt);

        if (views[formattedDate]) {
            if (views[formattedDate][current.employer.name]) {
                views[formattedDate][current.employer.name].viewTime.push(formattedTime);
                views[formattedDate][current.employer.name].viewTime.sort();
                views[formattedDate][current.employer.name].viewed =
                    views[formattedDate][current.employer.name].viewed && current.viewed;
            } else {
                views[formattedDate][current.employer.name] = {
                    employer: current.employer,
                    viewTime: [formattedTime],
                    viewed: current.viewed
                };
            }
        } else {
            views[formattedDate] = {};
            views[formattedDate][current.employer.name] = {
                employer: current.employer,
                viewTime: [formattedTime],
                viewed: current.viewed
            };
        }

        return views;
    }, views);

    return views;
};

export default viewsMock;
