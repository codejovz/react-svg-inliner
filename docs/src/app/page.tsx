"use client";

import { useState, useEffect } from 'react';
import { SvgInline } from '@/components/lib/SvgInline';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import styles from './page.module.css';

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [iconColor, setIconColor] = useState('white');
  const [neutralColor, setNeutralColor] = useState('white');

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIconColor('black');
      setNeutralColor('black');
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>react-svg-inliner</h1>
        <p className={styles.subtitle}>
          Inline SVG loader for React and Next.js, built with modern standards.
        </p>
        <div className={styles.badges}>
          <img src="https://img.shields.io/badge/react--svg--inliner-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" />
        </div>
      </div>

      <Card title="Interactive Demo">
        <div className={styles.demo}>
          <div className={styles.demoPreview} style={{ color: iconColor }}>
            <SvgInline
              src="/assets/icons/google/home_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
              activeSrc="/assets/icons/google/home_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg"
              active={isActive}
              className="w-8 h-8"
              style={{ width: '48px', height: '48px' }}
            />
          </div>
          <div className={styles.demoControls}>
            <div className={styles.controlGroup}>
              <label>Active State:</label>
              <Button onClick={() => setIsActive(!isActive)} variant={isActive ? 'primary' : 'default'}>
                {isActive ? 'Active' : 'Inactive'}
              </Button>
            </div>
            <div className={styles.controlGroup}>
              <label>Color:</label>
              <div className={styles.colorPicker}>
                {[neutralColor, '#0969da', '#cf222e', '#2da44e'].map(color => (
                  <button
                    key={color}
                    className={styles.colorSwatch}
                    style={{ backgroundColor: color, border: color === iconColor ? '2px solid var(--color-fg-default)' : '1px solid var(--color-border-default)' }}
                    onClick={() => setIconColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className={styles.demoNote}>
          Click "Active" to toggle between outlined and filled versions. Change colors using CSS.
        </p>
      </Card>

      <div className={styles.documentation}>
        <h2>Installation</h2>
        <CodeBlock code="npm install react-svg-inliner" />

        <h2>Usage</h2>
        <CodeBlock language="tsx" code={`"use client";

import { SvgInline } from "react-svg-inliner";

<SvgInline src="/icons/logo.svg" className="w-6 h-6" />`} />

        <h2>Advanced Usage (Active State)</h2>
        <p>Declarative handling of active states for navigation.</p>
        <CodeBlock language="tsx" code={`<SvgInline
  src="/icons/home-outline.svg"      // Default icon
  activeSrc="/icons/home-filled.svg" // Active icon
  active={isActive}                  // Boolean to switch
  className="w-8 h-8 transition-colors"
  title="Go to Home"
  id="home-icon"
/>`} />

        <h2>Props</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>src</code></td>
                <td><code>string</code></td>
                <td>Required. Relative URL to the default SVG.</td>
              </tr>
              <tr>
                <td><code>activeSrc</code></td>
                <td><code>string</code></td>
                <td>URL to the "active" version of the SVG.</td>
              </tr>
              <tr>
                <td><code>active</code></td>
                <td><code>boolean</code></td>
                <td>If true, the component renders activeSrc instead of src.</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td>CSS class string applied to the wrapper.</td>
              </tr>
              <tr>
                <td><code>style</code></td>
                <td><code>CSSProperties</code></td>
                <td>Inline styles applied to the wrapper.</td>
              </tr>
              <tr>
                <td><code>title</code></td>
                <td><code>string</code></td>
                <td>Title attribute for accessibility (tooltip).</td>
              </tr>
              <tr>
                <td><code>onError</code></td>
                <td><code>(err: Error) ={'>'} void</code></td>
                <td>Callback function if the SVG fails to load.</td>
              </tr>
              <tr>
                <td><code>id</code></td>
                <td><code>string</code></td>
                <td>ID to assign to the SVG element. Overrides the ID in the file if present.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
