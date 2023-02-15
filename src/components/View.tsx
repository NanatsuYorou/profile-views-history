import React, { useState, useEffect } from 'react';
import styles from './view.module.scss';
import clsx from 'clsx';

type employerType = {
    id: string;
    name: string;
    logo_urls: {
        '90': string;
    };
};

type props = {
    employerJson: string;
    viewsTimes: string[];
    viewed: boolean;
};

function View({ employerJson, viewsTimes, viewed }: props) {
    const [employer, setEmployer] = useState<employerType>();

    useEffect(() => {
        setEmployer(JSON.parse(employerJson));
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span className={clsx(viewed && styles.hide, !viewed && styles.new, styles.status)}>Новое</span>
                <div className={styles.employerContainer}>
                    <img src={employer?.logo_urls['90']} alt="" className={styles.employerImg} />
                    <span className={styles.employerName}>{JSON.parse(employerJson).name}</span>
                </div>
            </header>
            <div className={styles.content}>
                <span className={styles.timeLabel}>Время просмотра</span>
                <ul className={styles.timeContainer}>
                    {viewsTimes.map((time) => (
                        <li key={time} className={styles.time}>
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
}

export default View;
