"use client";

import React, { useEffect, useState } from "react";

/**
 * Maps SVG/XML attribute names (with colons or hyphens) to their
 * React-compatible camelCase prop equivalents.
 */
const SVG_ATTR_TO_REACT: Record<string, string> = {
    // Namespaced attributes
    "xmlns:xlink": "xmlnsXlink",
    "xlink:href": "xlinkHref",
    "xlink:title": "xlinkTitle",
    "xlink:show": "xlinkShow",
    "xlink:type": "xlinkType",
    "xlink:role": "xlinkRole",
    "xlink:arcrole": "xlinkArcrole",
    "xlink:actuate": "xlinkActuate",
    "xml:base": "xmlBase",
    "xml:lang": "xmlLang",
    "xml:space": "xmlSpace",
    // Hyphenated presentation attributes
    "accent-height": "accentHeight",
    "alignment-baseline": "alignmentBaseline",
    "arabic-form": "arabicForm",
    "baseline-shift": "baselineShift",
    "cap-height": "capHeight",
    "clip-path": "clipPath",
    "clip-rule": "clipRule",
    "color-interpolation": "colorInterpolation",
    "color-interpolation-filters": "colorInterpolationFilters",
    "color-profile": "colorProfile",
    "dominant-baseline": "dominantBaseline",
    "enable-background": "enableBackground",
    "fill-opacity": "fillOpacity",
    "fill-rule": "fillRule",
    "flood-color": "floodColor",
    "flood-opacity": "floodOpacity",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-size-adjust": "fontSizeAdjust",
    "font-stretch": "fontStretch",
    "font-style": "fontStyle",
    "font-variant": "fontVariant",
    "font-weight": "fontWeight",
    "glyph-name": "glyphName",
    "glyph-orientation-horizontal": "glyphOrientationHorizontal",
    "glyph-orientation-vertical": "glyphOrientationVertical",
    "horiz-adv-x": "horizAdvX",
    "horiz-origin-x": "horizOriginX",
    "image-rendering": "imageRendering",
    "letter-spacing": "letterSpacing",
    "lighting-color": "lightingColor",
    "marker-end": "markerEnd",
    "marker-mid": "markerMid",
    "marker-start": "markerStart",
    "overline-position": "overlinePosition",
    "overline-thickness": "overlineThickness",
    "paint-order": "paintOrder",
    "panose-1": "panose1",
    "pointer-events": "pointerEvents",
    "rendering-intent": "renderingIntent",
    "shape-rendering": "shapeRendering",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
    "strikethrough-position": "strikethroughPosition",
    "strikethrough-thickness": "strikethroughThickness",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-miterlimit": "strokeMiterlimit",
    "stroke-opacity": "strokeOpacity",
    "stroke-width": "strokeWidth",
    "text-anchor": "textAnchor",
    "text-decoration": "textDecoration",
    "text-rendering": "textRendering",
    "underline-position": "underlinePosition",
    "underline-thickness": "underlineThickness",
    "unicode-bidi": "unicodeBidi",
    "unicode-range": "unicodeRange",
    "units-per-em": "unitsPerEm",
    "v-alphabetic": "vAlphabetic",
    "v-hanging": "vHanging",
    "v-ideographic": "vIdeographic",
    "v-mathematical": "vMathematical",
    "vert-adv-y": "vertAdvY",
    "vert-origin-x": "vertOriginX",
    "vert-origin-y": "vertOriginY",
    "word-spacing": "wordSpacing",
    "writing-mode": "writingMode",
    "x-height": "xHeight",
};

/**
 * Convert an SVG DOM attribute name to its React-compatible prop name.
 */
function toReactProp(attrName: string): string {
    return SVG_ATTR_TO_REACT[attrName] ?? attrName;
}

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
                    // Convert SVG/XML attribute names to React-compatible camelCase props
                    attributes[toReactProp(attr.name)] = attr.value;
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