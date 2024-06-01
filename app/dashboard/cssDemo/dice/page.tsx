"use client"

import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';

function Dice({ state }: { state: Number }) {
    return (
        <div className={styles.dice}>
            <div className={`${styles.cube} ${styles['result' + state]}`}>
                <div className={`${styles.side} ${styles.one}`}>
                    <div className={styles.dot}></div>
                </div>
                <div className={`${styles.side} ${styles.six}`}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <div className={`${styles.side} ${styles.three}`}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <div className={`${styles.side} ${styles.four}`}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <div className={`${styles.side} ${styles.five}`}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <div className={`${styles.side} ${styles.two}`}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    const [seconds, setSeconds] = useState('');
    const [openResult, setOpenResult] = useState([0, 0, 0]);

    // get random result
    function getRandomArray() {
        const result = [];

        for (let i = 0; i < 3; i++) {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            result.push(randomNumber);
        }

        return result;
    }

    useEffect(() => {
        setSeconds('' + new Date().getSeconds() % 15)
        setOpenResult(getRandomArray())

        const interval = setInterval(() => {
            const currentTime = new Date();
            const secondsInMinute = currentTime.getSeconds() % 15;

            switch (secondsInMinute) {
                case 0:
                    setSeconds('opening...');
                    setOpenResult([0, 0, 0]);
                    break;
                case 3:
                    setOpenResult(getRandomArray());
                    break;
                default:
                    if (secondsInMinute >= 5) {
                        setSeconds('' + (15 - secondsInMinute));
                    }
                    break;
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const diceList = openResult.map((e, i) => (<Dice state={e} key={i} />))

    return (
        <div className={styles['open-result']}>
            <div className={styles['count-down']}>
                <div
                    className={clsx(seconds === 'opening...' ? '' : styles['count-down-text'])}
                    key={seconds}
                >{seconds}</div>
            </div>
            <div className={styles.warp}>
                {diceList}
            </div>
        </div>
    );
}
