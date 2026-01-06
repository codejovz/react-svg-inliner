import Link from 'next/link';
import styles from './styles.module.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
                onClick={onClose}
            />

            <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo} onClick={onClose}>Docs</div>
                </div>
                <ul className={styles.navList}>
                    <li><Link href="/" className={styles.navLink} onClick={onClose}>Getting Started</Link></li>
                    <li><Link href="/why-svgs" className={styles.navLink} onClick={onClose}>Why SVGs?</Link></li>
                </ul>
            </nav>
        </>
    );
}
