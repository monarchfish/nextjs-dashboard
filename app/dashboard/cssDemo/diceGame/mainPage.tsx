"use client"

import timer from './timer';
import CountDown from '@/app/ui/cssDemo/diceGame/countDown';
import Dice from '@/app/ui/cssDemo/diceGame/dice';
import Chip from '@/app/ui/cssDemo/diceGame/chip';
import styles from './styles.module.scss';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';

export default function Main() {
    const [selectedChip, setSelectedChip] = useState(0);
    const [betChips, setBetChips] = useState<{ preoffset?: string[], offset: string[], chipNums: number, betValue: string, time: number }[]>([]);
    const [openResult, seconds] = timer();
    const diceList = openResult.map((e, i) => (<Dice state={e} key={i} />))
    const winner = (+seconds > 7 && +seconds <= 10)
        ? (openResult.every(e => e === 0)
            ? ''
            : openResult.reduce((p, c) => p + c, 0) <= 10 ? 'small' : 'big')
        : ''

    useEffect(() => {
        if (+seconds === 8) {
            setBetChips(oldValue => {
                const newChips = oldValue
                    .filter(e => e.betValue === winner)
                    .map((e, i) => {
                        const copyValue = {...e}
                        copyValue.time = Date.now() + i
                        copyValue.preoffset = copyValue.offset
                        copyValue.offset = ['100vw', '10vh']
                        return copyValue
                    })

                return [
                    ...oldValue,
                    ...newChips
                ]
            })

            setTimeout(() => {
                setBetChips(oldValue => {
                    oldValue.filter(e => e.offset[1] === '10vh')
                        .forEach(e => {
                            e.offset = e?.preoffset ?? e.offset
                            return e
                        })

                    return [...oldValue]
                })
            }, 100);


            setTimeout(() => {
                setBetChips(oldValue => {
                    return oldValue.map(e => {
                        if (winner === e.betValue) {
                            e.offset = ['100vw', '180vh']
                        } else {
                            e.offset = ['100vw', '10vh']
                        }
                        return e
                    })
                })
            }, 500);

            setTimeout(() => {
                setBetChips([])
            }, 1000);
        }
    }, [seconds, winner])

    const onBet = (event: React.MouseEvent<HTMLDivElement>, betValue: string) => {
        if (!(+seconds <= 7)) return
        const offset = [2 * event.pageX + 'px', 2 * event.pageY + 'px']
        const time = Date.now()
        setBetChips(oldValue => {
            return [...oldValue, {
                offset: ['100vw', '180vh'],
                chipNums: selectedChip,
                betValue,
                time,
            }]
        })
        setTimeout(() => {
            setBetChips(oldValue => {
                const newValue = [...oldValue]
                const findChip = newValue.find(e => e.time === time)
                if (findChip) {
                    findChip.offset = offset
                }
                return newValue
            })
        }, 0)
    }

    const handleSelected = (value: number) => {
        setSelectedChip(value)
    }
    const chipValues = [0, 1, 2, 3, 4]
    const chipList = chipValues.map(e => {
        return <Chip
            state={e}
            active={selectedChip === e}
            key={e}
            handleSlected={() => handleSelected(e)}
        />
    })
    const betChipList = betChips.map(e => {
        return <Chip
            state={e.chipNums}
            active={false}
            key={e.time}
            style={{
                transform: `scale(0.5) translateX(${e.offset[0]}) translateY(${e.offset[1]})  translateX(-100%) translateY(-100%)`
            }}
        />
    })

    return (
        <>
            <div className={styles.openResult}>
                <CountDown text={seconds} />
                <div className={styles.diceList}>
                    {diceList}
                </div>
            </div>
            <div className={styles.bettingArea}>
                <div
                    className={clsx(styles.item, winner === 'big' ? styles.winner : '')}
                    onClick={e => onBet(e, 'big')}
                >Big</div>
                <div
                    className={clsx(styles.item, winner === 'small' ? styles.winner : '')}
                    onClick={e => onBet(e, 'small')}
                >Small</div>
            </div>
            <div className={styles.chipArea}>
                {chipList}
            </div>
            <div className={styles.flyChipArea}>{betChipList}</div>
        </>
    );
}
