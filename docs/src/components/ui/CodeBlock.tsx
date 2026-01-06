import styles from './styles.module.css';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
    return (
        <div className={styles.codeBlockWrapper}>
            <pre className={styles.codeBlock}>
                <code className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        </div>
    );
}
