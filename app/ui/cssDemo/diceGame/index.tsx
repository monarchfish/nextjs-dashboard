"use client"

import CountDown from './countDown';
import Dice from './dice';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';

export default function Main() {
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
        setSeconds('--')
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
        <div className={styles.openResult}>
            <CountDown text={seconds}/>
            <div className={styles.diceList}>
                {diceList}
            </div>
        </div>
    );
}
