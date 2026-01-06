import { SvgInline } from '../lib/SvgInline';
import styles from './styles.module.css';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.leftSection}>
                    <button className={styles.menuButton} onClick={onMenuClick} aria-label="Toggle Menu">
                        <SvgInline
                            src="/assets/icons/google/menu_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                            className={styles.menuIcon}
                        />
                    </button>
                    <h1>react-svg-inliner</h1>
                </div>
                <div className={styles.headerActions}>
                    <a href="https://github.com/codejovz/react-svg-inliner" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                        <SvgInline
                            src="/assets/icons/github/github-mark.svg"
                            className={styles.githubIcon}
                            style={{ width: '20px', height: '20px' }}
                        />
                        GitHub
                    </a>
                </div>
            </div>
        </header>
    );
}
