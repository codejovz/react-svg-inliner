"use client";

import { useState, useEffect } from 'react';
import { SvgInline } from '@/components/lib/SvgInline';

import styles from './page.module.css';

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
  <path d="M480-80 200-360l56-56 184 183 184-183 56 56-200 280Zm0-560L200-360l56 56 184-184 184 184 56-56-200-280Z"/>
</svg>`;



export default function PlaygroundPage() {
    const [activeTab, setActiveTab] = useState<'svg' | 'tsx'>('tsx');
    const [svgContent, setSvgContent] = useState(DEFAULT_SVG);
    const [svgUrl, setSvgUrl] = useState('');

    useEffect(() => {
        // Create a blob URL for the current SVG content
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        setSvgUrl(url);

        // Cleanup
        return () => URL.revokeObjectURL(url);
    }, [svgContent]);

    const [tsxCode, setTsxCode] = useState('');

    // Parse props from the TSX code string
    const getPreviewProps = (code: string) => {
        const props: any = {};

        // Parse className
        const classMatch = code.match(/className=(["'])(.*?)\1/);
        if (classMatch) props.className = classMatch[2];

        // Parse id
        const idMatch = code.match(/\sid=(["'])(.*?)\1/);
        if (idMatch) props.id = idMatch[2];

        // Parse title
        const titleMatch = code.match(/title=(["'])(.*?)\1/);
        if (titleMatch) props.title = titleMatch[2];

        // Parse activeSrc
        const activeSrcMatch = code.match(/activeSrc=(["'])(.*?)\1/);
        if (activeSrcMatch) props.activeSrc = activeSrcMatch[2];

        // Parse active
        // Check for active={true} or just active prop presence
        const hasActiveProp = /(\s|^)active(?=(\s|$|>|=\{))/.test(code);
        const activeExplicit = code.match(/active=\{(true|false)\}/);

        if (activeExplicit) {
            props.active = activeExplicit[1] === 'true';
        } else if (hasActiveProp) {
            props.active = true;
        }

        // Parse style={{ ... }} simple implementation
        const styleMatch = code.match(/style=\{\{([\s\S]*?)\}\}/);
        if (styleMatch) {
            try {
                const styleObj: any = {};
                // Split by comma to get pairs
                styleMatch[1].split(',').forEach(pair => {
                    const parts = pair.split(':');
                    if (parts.length >= 2) {
                        const key = parts[0].trim();
                        // simplistic value cleaning: remove quotes
                        let val = parts.slice(1).join(':').trim();
                        const isString = /^['"]/.test(val);
                        val = val.replace(/^['"]|['"]$/g, '');

                        // Parse numbers if it looks like a number and wasn't quoted
                        if (!isString && !isNaN(Number(val))) {
                            styleObj[key] = Number(val);
                        } else {
                            styleObj[key] = val;
                        }
                    }
                });
                props.style = styleObj;
            } catch (e) {
                // ignore parsing errors
            }
        }

        return props;
    };

    // Update TSX code when src (SVG) changes, preserving other props if possible
    useEffect(() => {
        if (!svgUrl) return;

        setTsxCode(prev => {
            const cleanUrl = svgUrl || '...';
            // If empty or never initialized, set default
            if (!prev) {
                return `import { SvgInline } from "react-svg-inliner";

export function MyComponent() {
  return (
    <SvgInline
      src="${cleanUrl}"
      className="icon-class"
      style={{ width: 64, height: 64 }}
      id="my-icon"
      title="Dynamic Icon"
      active={false}
      activeSrc="/path/to/active-icon.svg"
      onError={(err) => console.error(err)}
    />
  );
}`;
            }

            // If it exists, try to replace just the src prop to keep it sync
            // Regex to find src="..." or src='...'
            if (/src=(["']).*?\1/.test(prev)) {
                return prev.replace(/src=(["']).*?\1/, `src="${cleanUrl}"`);
            }
            return prev;
        });
    }, [svgUrl]);

    const previewProps = getPreviewProps(tsxCode);

    return (
        <div className={styles.container}>
            <header>
                <h1 className={styles.title}>Playground</h1>
                <p className={styles.subtitle}>
                    Interactive environment to test and generate SVG components.
                </p>
            </header>

            <div className={styles.editorContainer}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'tsx' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('tsx')}
                    >
                        Usage (TSX)
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'svg' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('svg')}
                    >
                        SVG Code
                    </button>
                </div>

                <div className={styles.contentArea}>
                    {activeTab === 'svg' && (
                        <textarea
                            className={styles.textarea}
                            value={svgContent}
                            onChange={(e) => setSvgContent(e.target.value)}
                            spellCheck={false}
                            placeholder="Paste your SVG code here..."
                        />
                    )}
                    {activeTab === 'tsx' && (
                        <textarea
                            className={styles.textarea}
                            value={tsxCode}
                            onChange={(e) => setTsxCode(e.target.value)}
                            spellCheck={false}
                            placeholder="Edit component usage..."
                        />
                    )}
                </div>
            </div>

            <div className={styles.previewContainer}>
                <h2 className={styles.previewTitle}>Result</h2>
                <div className={styles.previewBox}>
                    {svgUrl && (
                        <div title="Rendered Icon">
                            {/* We use the props parsed from the TSX code, but ensure src matches the real blob */}
                            <SvgInline
                                src={svgUrl}
                                {...previewProps}
                                // Ensure these essential overrides aren't broken by bad parsing
                                onError={(e) => console.error(e)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
