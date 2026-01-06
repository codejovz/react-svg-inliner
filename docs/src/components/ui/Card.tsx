import styles from './card.module.css';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export function Card({ children, title, className }: CardProps) {
    return (
        <div className={`${styles.card} ${className || ''}`}>
            {title && <div className={styles.cardHeader}>{title}</div>}
            <div className={styles.cardBody}>
                {children}
            </div>
        </div>
    );
}
