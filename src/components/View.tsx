import React, { FunctionComponent } from 'react';
import styles from './View.module.scss';
import clsx from 'clsx';
import { ViewInfo } from '../types/interfaces';
const View: FunctionComponent<ViewInfo> = ({ viewed, viewTime, employer }) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span
                    className={clsx(styles.status, {
                        [styles.hidden]: viewed,
                        [styles.new]: !viewed
                    })}
                >
                    Новое
                </span>
                <div className={styles.employerContainer}>
                    <img src={employer?.logo['url']} alt="" className={styles.employerImg} />
                    <span className={styles.employerName}>{employer.name}</span>
                </div>
            </header>
            <div className={styles.content}>
                <span className={styles.timeLabel}>Время просмотра</span>
                <ul className={styles.timeContainer}>
                    {viewTime.map((time, index) => (
                        <li key={time + index} className={styles.time}>
                            {time}
                        </li>
                    ))}
                </ul>
            </div>
            <footer className={styles.footer}>
                <a
                    rel="noreferrer"
                    href={'https://hh.ru/employer/' + employer?.id}
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
