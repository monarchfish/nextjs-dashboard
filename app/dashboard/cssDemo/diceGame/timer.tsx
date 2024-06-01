"use client"

import { useState, useEffect } from 'react';

export default function Main(): [number[], String] {
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
        let perviusSecond = -1
        setSeconds('--')
        setOpenResult(getRandomArray())

        const interval = setInterval(() => {
            const currentTime = new Date();
            const secondsInMinute = currentTime.getSeconds() % 15;
            if (perviusSecond === secondsInMinute) return
            perviusSecond = secondsInMinute

            switch (secondsInMinute) {
                case 0:
                    setSeconds('opening...');
                    setOpenResult([0, 0, 0]);
                    break;
                case 5:
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

    return [openResult, seconds]
}
