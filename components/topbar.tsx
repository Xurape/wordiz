import styles from '@/styles/components/topbar.module.css';
import { Separator } from '@radix-ui/react-separator';

export default function Topbar() {
    return (
        <header className={styles.header}>
            <a className={styles.a}>Wordiz</a>
            <Separator className={styles.separator} />
        </header>
    );
}