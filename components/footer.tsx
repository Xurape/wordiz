import styles from '@/styles/components/footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
            <span>Made by <a href="https://joaopferreira.me" className={styles.a}>João Ferreira</a></span>
            </div>
            <div className={styles.links}>
                <a href="https://joaopferreira.me" className={styles.a}>Portfolio</a>
                <>|</>
                <a href="https://github.com/xurape" className={styles.a}>GitHub</a>
            </div>
        </footer>
    );
}