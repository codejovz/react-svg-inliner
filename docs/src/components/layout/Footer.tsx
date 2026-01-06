import styles from './styles.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>© {new Date().getFullYear()} react-svg-inliner. Licensed under MIT.</p>
                <p className={styles.version}>Versioned on GitHub</p>
            </div>
        </footer>
    );
}
