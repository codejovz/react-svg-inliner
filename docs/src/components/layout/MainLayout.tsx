"use client";

import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './styles.module.css';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.layout}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className={styles.mainWrapper}>
                <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className={styles.mainContent}>
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
