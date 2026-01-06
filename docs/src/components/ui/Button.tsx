import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'default' | 'danger';
    children: ReactNode;
}

export function Button({ variant = 'default', className, children, ...props }: ButtonProps) {
    const variantClass = styles[`btn-${variant}`];
    return (
        <button className={`${styles.btn} ${variantClass} ${className || ''}`} {...props}>
            {children}
        </button>
    );
}
