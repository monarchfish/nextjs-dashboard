import styles from './styles.module.scss';
import { clsx } from 'clsx';

export default function Dice({
    state,
    active,
    handleSlected,
    style = { transform: '' },
}: {
    state: number,
    active: boolean,
    handleSlected?: React.MouseEventHandler<HTMLDivElement>,
    style?: { transform: string },
}) {
    const mapping = [
        {
            price: 1,
            color: 'yellow',
        },
        {
            price: 5,
            color: 'red',
        },
        {
            price: 10,
            color: 'blue',
        },
        {
            price: 50,
            color: 'orange',
        },
        {
            price: 100,
            color: 'black',
        },
    ]
    const data = mapping[state]

    return (
        <div
            className={clsx(styles.chip, active ? styles.active : '')}
            style={{
                backgroundColor: data.color,
                ...style
            }}
            onClick={handleSlected}
        >
            <div className={styles.cirle}>
                <div className={styles.price}>
                    {data.price}
                </div>
            </div>
        </div>
    );
}
