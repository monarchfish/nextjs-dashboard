"use client"

import timer from './timer';
import CountDown from '@/app/ui/cssDemo/diceGame/countDown';
import Dice from '@/app/ui/cssDemo/diceGame/dice';
import styles from './styles.module.scss';

export default function Main() {
    const [openResult, seconds] = timer();

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
