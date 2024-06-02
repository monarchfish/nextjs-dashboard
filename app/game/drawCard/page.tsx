import styles from './styles.module.scss';
import DrawCard from '@/app/ui/game/drawCard';

export default function Page() {
    return (
        <div className={styles.drawCard}>
            <DrawCard />
        </div>
    );
}
