import { SvgInline } from '../lib/SvgInline';
import styles from './styles.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>© {new Date().getFullYear()} react-svg-inliner. Licensed under MIT.</p>
                <a
                    href="https://github.com/codejovz/react-svg-inliner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.version}
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit' }}
                >
                    Versioned on GitHub
                    <SvgInline
                        src="/assets/icons/github/github-mark.svg"
                        className={styles.githubIcon}
                        style={{ width: '20px', height: '20px' }}
                    />
                </a>
            </div>
        </footer>
    );
}
