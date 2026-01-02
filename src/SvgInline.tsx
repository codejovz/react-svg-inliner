"use client";

import React, { useEffect, useState } from "react";

export type SvgInlineProps = {
    /** Relative URL to the SVG (e.g. `/assets/icons/my.svg` or `./icon.svg`) */
    src: string;
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    onError?: (err: Error) => void;
    /** When true, use `activeSrc` (if provided) instead of `src` */
    active?: boolean;
    /** Optional alternative SVG URL to use when `active` is true */
    activeSrc?: string;
};

/**
 * SvgInline
 *
 * Client component that fetches a relative SVG URL at runtime and inserts
 * the raw SVG markup inline using `dangerouslySetInnerHTML`.
 *
 * Usage:
 * <SvgInline src="/assets/icons/logo.svg" className="w-6 h-6" />
 *
 * Note: the `src` must be reachable from the browser (for example files
 * placed in `public/` or served by an API route). This approach avoids
 * static imports and works inside `src/app` when dynamic imports of SVG
 * as React components are not available.
 */
export function SvgInline({ src, className, style, title, onError, active, activeSrc }: SvgInlineProps) {
    const [svg, setSvg] = useState<string | null>(null);


    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                // choose activeSrc if active is true and activeSrc provided
                const chosen = (active && activeSrc) ? activeSrc : src;
                const res = await fetch(chosen, { cache: "force-cache" });
                if (!res.ok) throw new Error(`Failed to fetch SVG "${chosen}": ${res.status}`);
                const text = await res.text();
                if (!cancelled) setSvg(text);
            } catch (err: any) {
                onError?.(err);
                // Keep svg null so nothing renders in case of error
                console.error(err);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
        // re-run when src, active, activeSrc or onError change
    }, [src, active, activeSrc, onError]);

    if (!svg) return null;

    return (
        <span
            className={className}
            style={style}
            title={title}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}