import styles from './styles.module.scss';

export default function Dice({ state }: { state: Number }) {
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
