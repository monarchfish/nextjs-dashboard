import styles from './styles.module.scss';
import { clsx } from 'clsx';

export default function countDown({ text }: { text: String }) {
    return (
        <div className={styles.countDown}>
            <div
                className={clsx(text === 'opening...' ? '' : styles.countDownText)}
                key={text as React.Key}
            >{text}</div>
        </div>
    );
}
