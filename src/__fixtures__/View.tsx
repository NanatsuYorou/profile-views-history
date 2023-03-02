import React from 'react';
import View from '../components/View';

const employer = {
    id: '1455',
    name: 'HeadHunterHeadHunterHeadHunterHeadHunterHeadHunterHeadHunter',
    logo: {
        url: 'https://hh.ru/employer/logo/1455'
    }
};

const viewTimeArray = [];

const companyViewInfo = {
    employer,
    viewTimeArray,
    isViewed: false
};
export default <View companyViewInfo={companyViewInfo} />;
