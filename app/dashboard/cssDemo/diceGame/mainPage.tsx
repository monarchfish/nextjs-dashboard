"use client"

import timer from './timer';
import CountDown from '@/app/ui/cssDemo/diceGame/countDown';
import Dice from '@/app/ui/cssDemo/diceGame/dice';
import Chip from '@/app/ui/cssDemo/diceGame/chip';
import styles from './styles.module.scss';

export default function Main() {
    const [openResult, seconds] = timer();

    const diceList = openResult.map((e, i) => (<Dice state={e} key={i} />))

    return (
        <>
            <div className={styles.openResult}>
                <CountDown text={seconds} />
                <div className={styles.diceList}>
                    {diceList}
                </div>
            </div>
            <div className={styles.bettingArea}>
                <div className={styles.item}>Big</div>
                <div className={styles.item}>Small</div>
            </div>
            <div className={styles.chipArea}>
                <Chip state={0}/>
                <Chip state={1}/>
                <Chip state={2}/>
                <Chip state={3}/>
                <Chip state={4}/>
            </div>
        </>
    );
}
