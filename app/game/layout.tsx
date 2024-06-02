import SideNav from '@/app/ui/game/sideNav';
import styles from './styles.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  const getRandomNum = () => {
    return Math.floor(Math.random() * 40);
  };

  return (
    <div className={`flex h-screen flex-col md:flex-row md:overflow-hidden relative`}>
      <div className={styles.bubbleBackground}>
        <div className={styles.bubbles}>
          {Array.from({ length: 50 }).map((_, index) => (
            <span
              style={{ '--i': getRandomNum() } as React.CSSProperties}
              key={index}
            ></span>
          ))}
        </div>
      </div>
      <div className="w-full flex-none md:w-64 relative">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 relative">{children}</div>
    </div>
  );
}
