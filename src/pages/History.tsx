import React, { FunctionComponent } from 'react';
import styles from './History.module.scss';
import { ViewMockedInfo } from '../types/interfaces';
import ViewList from '../components/ViewList';

type Props = {
    mockedData: ViewMockedInfo;
    dateList: string[];
};

const History: FunctionComponent<Props> = ({ mockedData, dateList }) => {
    return (
        <ul className={styles.datesList}>
            {dateList.map((date) => {
                return (
                    <li key={date} className={styles.datesItem}>
                        <span className={styles.date}>{date}</span>
                        <ViewList {...mockedData[date]} />
                    </li>
                );
            })}
        </ul>
    );
};

export default History;
