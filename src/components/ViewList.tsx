import React, { FunctionComponent } from 'react';
import View from './View';
import styles from './ViewList.module.scss';
import { CompanyViewInfo } from '../types/interfaces';

interface Props {
    viewList: CompanyViewInfo[];
}

const ViewList: FunctionComponent<Props> = (viewList) => {
    const employerNamesList: string[] = Object.keys(viewList);

    return (
        <ul className={styles.viewList}>
            {employerNamesList.map((employerName) => {
                return (
                    <li key={employerName} className={styles.viewItem}>
                        <View companyViewInfo={viewList[employerName]} />
                    </li>
                );
            })}
        </ul>
    );
};

export default ViewList;
