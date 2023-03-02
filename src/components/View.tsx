import React, { FunctionComponent } from 'react';
import styles from './View.module.scss';
import clsx from 'clsx';
import { CompanyViewInfo } from '../types/interfaces';

interface Props {
    companyViewInfo: CompanyViewInfo;
}

const View: FunctionComponent<Props> = ({ companyViewInfo }) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span
                    className={clsx(styles.status, {
                        [styles.hidden]: companyViewInfo.isViewed,
                        [styles.new]: !companyViewInfo.isViewed
                    })}
                >
                    Новое
                </span>
                <div className={styles.employerContainer}>
                    <img src={companyViewInfo.employer?.logo['url']} alt="" className={styles.employerImg} />
                    <span className={styles.employerName}>{companyViewInfo.employer.name}</span>
                </div>
            </header>
            <div className={styles.content}>
                <span className={styles.timeLabel}>Время просмотра</span>
                <ul className={styles.timeContainer}>
                    {companyViewInfo.viewTimeArray.map((time, index) => (
                        <li key={time + index} className={styles.time}>
                            {time}
                        </li>
                    ))}
                </ul>
            </div>
            <footer className={styles.footer}>
                <a
                    rel="noreferrer"
                    href={'https://hh.ru/employer/' + companyViewInfo.employer?.id}
                    target={'_blank'}
                    className={styles.link}
                >
                    Вакансии компании
                </a>
            </footer>
        </div>
    );
};

export default View;
