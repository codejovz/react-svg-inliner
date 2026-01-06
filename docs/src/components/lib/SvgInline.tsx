"use client";

import React, { useEffect, useState } from "react";

export type SvgInlineProps = {
    /** Relative URL to the SVG (e.g. `/assets/icons/my.svg` or `./icon.svg`) */
    src: string;
    className?: string;
    style?: React.CSSProperties;
    /** ID to assign to the SVG element. Overrides the ID in the file if present. */
    id?: string;
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
export function SvgInline({ src, className, style, id, title, onError, active, activeSrc }: SvgInlineProps) {
    const [svgData, setSvgData] = useState<{ content: string; attributes: Record<string, string> } | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                // choose activeSrc if active is true and activeSrc provided
                const chosen = (active && activeSrc) ? activeSrc : src;
                const res = await fetch(chosen, { cache: "force-cache" });
                if (!res.ok) throw new Error(`Failed to fetch SVG "${chosen}": ${res.status}`);

                const text = await res.text();
                if (cancelled) return;

                // Parse the SVG string to a DOM node
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, "image/svg+xml");
                const svgEl = doc.documentElement;

                // Safety check: ensure strict SVG content
                if (svgEl.tagName.toLowerCase() !== "svg") {
                    throw new Error(`Fetched content for "${chosen}" is not a valid SVG`);
                }

                // Extract attributes from the root <svg> tag
                const attributes: Record<string, string> = {};
                Array.from(svgEl.attributes).forEach((attr) => {
                    // Map 'class' to 'className' to avoid React warnings and support fallback
                    if (attr.name === "class") {
                        attributes.className = attr.value;
                        return;
                    }
                    // Forcing fill to currentColor allows parent CSS (like color: ...) to control the icon color
                    if (attr.name === "fill" && attr.value !== "none") {
                        attributes.fill = "currentColor";
                        return;
                    }
                    attributes[attr.name] = attr.value;
                });

                setSvgData({
                    content: svgEl.innerHTML,
                    attributes: {
                        ...attributes,
                        // Fix for SVGs missing viewBox (like GitHub mark) but having width/height
                        // This allows them to scale with CSS instead of being fixed size
                        ...(!attributes.viewBox && attributes.width && attributes.height ? {
                            viewBox: `0 0 ${attributes.width.replace('px', '')} ${attributes.height.replace('px', '')}`
                        } : {})
                    }
                });

            } catch (err: any) {
                onError?.(err);
                console.error(err);
                if (!cancelled) setSvgData(null);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
        // re-run when src, active, activeSrc or onError change
    }, [src, active, activeSrc, onError]);

    if (!svgData) return null;

    return (
        <svg
            {...svgData.attributes}
            // Props override internal attributes if provided, otherwise fallback to internal
            id={id || svgData.attributes.id}
            className={className || svgData.attributes.className}
            style={style}
            dangerouslySetInnerHTML={{ __html: title ? `<title>${title}</title>${svgData.content}` : svgData.content }}
        />
    );
}