import styles from '@/styles/components/topbar.module.css';

export default function Topbar() {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
            &copy; 2024 Wordiz. All rights reserved.
            </div>
            <div className={styles.links}>
                <a>link 1</a>
                <>|</>
                <a>link 2</a>
            </div>
        </footer>
    );
}