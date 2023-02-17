import React, { FunctionComponent } from 'react';
import View from './View';
import styles from './ViewList.module.scss';
import { ViewInfo } from '../types/interfaces';
const ViewList: FunctionComponent<ViewInfo[]> = (viewList) => {
    const employersList = Object.keys(viewList);

    return (
        <ul className={styles.viewList}>
            {employersList.map((employer) => {
                return (
                    <li key={employer} className={styles.viewItem}>
                        <View {...viewList[employer]} />
                    </li>
                );
            })}
        </ul>
    );
};

export default ViewList;
