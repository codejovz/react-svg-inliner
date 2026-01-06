import { Card } from '@/components/ui/Card';
import styles from './styles.module.css';

export default function WhySvgs() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Why Use SVGs?</h1>
            <p className={styles.subtitle}>
                Scalable Vector Graphics (SVG) are the modern standard for web icons and illustrations.
            </p>

            <div className={styles.grid}>
                <Card title="1. Infinite Scalability" className={styles.card}>
                    <p>
                        Unlike raster images (PNG, JPG) which are made of pixels, SVGs are defined by mathematical vectors.
                        This means they look crisp on any screen size, zoom level, or pixel density (Retina displays).
                        You never need to serve multiple versions (@1x, @2x, @3x).
                    </p>
                </Card>

                <Card title="2. Performance & Size" className={styles.card}>
                    <p>
                        For icons and simple illustrations, SVGs are often significantly smaller in file size than their raster counterparts.
                        When inlined (like with this library), you save an HTTP request entirely, speeding up page loads.
                    </p>
                </Card>

                <Card title="3. Style & Interactivity" className={styles.card}>
                    <p>
                        SVGs are just code (XML). You can manipulate them with CSS and JavaScript just like any other HTML element.
                        Change fill colors on hover, animate strokes, or morph shapes dynamically—things impossible with a PNG.
                    </p>
                </Card>

                <Card title="4. Accessibility & SEO" className={styles.card}>
                    <p>
                        SVGs contain semantic markup. You can add <code>&lt;title&gt;</code> and <code>&lt;desc&gt;</code> tags
                        internally, making them readable by screen readers and indexable by search engines.
                    </p>
                </Card>
            </div>

            <div className={styles.comparison}>
                <h2>SVG vs Raster</h2>
                <div className={styles.comparisonGrid}>
                    <div className={styles.comparisonItem}>
                        <h3>SVG</h3>
                        <div className={styles.visualSvg}>
                            <svg viewBox="0 0 100 100" className={styles.iconDemo}>
                                <circle cx="50" cy="50" r="40" stroke="var(--color-accent-fg)" strokeWidth="4" fill="none" />
                                <path d="M30 50 L45 65 L70 35" stroke="var(--color-fg-default)" strokeWidth="4" fill="none" />
                            </svg>
                        </div>
                        <p>Crisp edges at any zoom.</p>
                    </div>
                    <div className={styles.comparisonItem}>
                        <h3>PNG (Simulated Zoom)</h3>
                        <div className={styles.visualRaster}>
                            {/* Simulated pixelation with CSS */}
                            <svg viewBox="0 0 100 100" className={styles.iconDemoRaster}>
                                <circle cx="50" cy="50" r="40" stroke="var(--color-accent-fg)" strokeWidth="4" fill="none" />
                                <path d="M30 50 L45 65 L70 35" stroke="var(--color-fg-default)" strokeWidth="4" fill="none" />
                            </svg>
                        </div>
                        <p>Pixelated/Blurry edges.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
