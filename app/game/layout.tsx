import SideNav from '@/app/ui/game/sideNav/sideNav';
import styles from './styles.module.scss';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const getRandomNum = () => {
    return Math.floor(Math.random() * 40);
  }

  return (
    <div className={`flex h-screen flex-col md:flex-row md:overflow-hidden`}>
      <div className={styles.bubbleBackground}> 
        <div className={styles.bubbles}>
        {
          Array.from({ length: 50 }).map((_, index) => (
            <span style={{ '--i': getRandomNum() } as React.CSSProperties} key={index}></span>
          ))
        }
          
        </div>
      </div>
    </div>
  );
}