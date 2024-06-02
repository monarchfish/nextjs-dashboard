import styles from './styles.module.scss';

export default function Dice({ state }: { state: number }) {
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
        <div className={styles.chip} style={{ backgroundColor: data.color }}>
            <div className={styles.cirle}>
                <div className={styles.price}>
                    {data.price}
                </div>
            </div>
        </div>
    );
}
