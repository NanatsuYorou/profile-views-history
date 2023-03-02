import dayjs from 'dayjs';
import getDateHeading from './getDateHeading';
import { ViewInitialInfo, ViewMockedInfo } from '../types/interfaces';

const mockViews = function (sourceViews: ViewInitialInfo[]): ViewMockedInfo {
    const views = {} as ViewMockedInfo;

    const sortedSourceViews = [...sourceViews].sort((a, b) => {
        if (dayjs(a.createdAt).year() === dayjs(b.createdAt).year()) {
            return dayjs(b.createdAt).millisecond() - dayjs(a.createdAt).millisecond();
        }
        return dayjs(b.createdAt).year() - dayjs(a.createdAt).year();
    });

    let formattedTime = '';
    let formattedDate = '';

    sortedSourceViews.reduce((views, currentViewInfo) => {
        formattedTime = dayjs(currentViewInfo.createdAt).format('HH:mm');
        formattedDate = getDateHeading(currentViewInfo.createdAt);

        if (!views[formattedDate]) {
            views[formattedDate] = {};
            views[formattedDate][currentViewInfo.employer.name] = {
                employer: currentViewInfo.employer,
                viewTimeArray: [formattedTime],
                isViewed: currentViewInfo.isViewed
            };
        }

        const companyViewsOnDate = views[formattedDate][currentViewInfo.employer.name];

        if (!companyViewsOnDate) {
            views[formattedDate][currentViewInfo.employer.name] = {
                employer: currentViewInfo.employer,
                viewTimeArray: [formattedTime],
                isViewed: currentViewInfo.isViewed
            };
        }

        views[formattedDate][currentViewInfo.employer.name].viewTimeArray.push(formattedTime);
        views[formattedDate][currentViewInfo.employer.name].viewTimeArray.sort();
        views[formattedDate][currentViewInfo.employer.name].isViewed =
            views[formattedDate][currentViewInfo.employer.name].isViewed && currentViewInfo.isViewed;

        return views;
    }, views);

    return views;
};

export default mockViews;
