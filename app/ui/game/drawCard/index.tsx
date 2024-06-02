import styles from './styles.module.scss';

export default function DrawCard() {
  return (
    <div className={styles.drawCard}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          className={styles.card}
          style={{ '--i': index - 5 } as React.CSSProperties}
          key={index}
        >
          {index + 1}
        </div>
      ))}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          className={styles.card}
          style={{ '--i': index } as React.CSSProperties}
          key={index}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}
