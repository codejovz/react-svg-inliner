# react-svg-inliner

[![CI](https://github.com/codejovz/react-svg-inliner/actions/workflows/instructions.yml/badge.svg)](https://github.com/codejovz/react-svg-inliner/actions/workflows/instructions.yml)


Inline SVG loader for React and Next.js, built with modern standards:
- Fully compatible with React 18 (Next.js 13 supported).
- Written in TypeScript for type safety.
- Declarative handling of active states.
- Supports modern CSS and accessibility best practices.

## ⚙️ Installation

```bash
npm install react-svg-inliner
```

## 🚀 Usage
```tsx

"use client";

import { SvgInline } from "react-svg-inliner";

<SvgInline src="/icons/logo.svg" className="w-6 h-6" />
```

### ✨ Advanced Usage (Active State)
You can easily handle "active" states (like in navigation bars) by providing an alternative source:

```tsx
<SvgInline
  src="/icons/home-outline.svg"      // Default icon
  activeSrc="/icons/home-filled.svg" // Active icon
  active={isActive}                  // Boolean to switch
  className="w-8 h-8 transition-colors"
  title="Go to Home"
/>
```

## 📦 Props
|  Prop	| Type	| Description
|---|---|---
src	| string	| Required. Relative URL to the default SVG.
activeSrc	| string	| URL to the "active" version of the SVG.
active	| boolean	| If true, the component renders activeSrc instead of src.
className	| string	| CSS class string applied to the wrapper element.
style	| CSSProperties	| Inline styles applied to the wrapper element.
title	| string	| Title attribute (tooltip) for accessibility.
onError	| (err: Error) => void	| Callback function if the SVG fails to load.

## 📝 Notes
- **Client Component**: This library uses `fetch` and `useState` internally, so it must be used in Client Components. In Next.js, ensure the parent file has `"use client"`.
- **Public Access**: The `src` URLs must be publicly reachable by the browser (e.g., inside the `public/` folder).

## 🤝 Contributing
We welcome contributions! Please see our 
[CONTRIBUTING.md](CONTRIBUTING.md)
 for details on how to get started.

Please note that this project is released with a 
[Contributor Code of Conduct](CODE_OF_CONDUCT.md)
. By participating in this project you agree to abide by its terms.

## 📜 License
This project is licensed under the MIT License - see the 
[LICENSE](LICENSE)
 file for details.