# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun dev` - Start development server with Webpack (Turbopack disabled due to Three.js compatibility issues)
- `bun build` - Build production bundle and check for build errors
- `bun start` - Start production server
- `bun lint` - Run ESLint to check code quality and style

**Note**: This project uses Bun as the package manager and runtime for faster installs and better performance.

## Deployment

This project is configured to deploy on Vercel with Bun runtime:
- **vercel.json**: Specifies `bunVersion: "1.x"` to use Bun runtime on Vercel
- **Benefits**: Faster cold starts, lower memory usage, better performance vs Node.js
- **Status**: Bun runtime on Vercel is in Beta
- **Deploy**: Use `bunx vercel deploy` or push to GitHub (if connected to Vercel)

## Architecture Overview

This is a Next.js 16 travel blog application called "Living Gambit" featuring:

### Core Structure
- **App Router**: Uses Next.js 16 App Router with TypeScript
- **3D Globe**: Interactive Three.js/React Three Fiber globe showing journey with arcs and markers
- **Interactive Map**: Leaflet-based journey visualization with dynamic imports
- **Content Management**: Static content stored in TypeScript files under `src/content/`

### Key Components
- **InteractiveGlobe.tsx**: Wrapper component for the 3D globe with lazy loading
- **GlobeScene.tsx**: Three.js canvas with globe, markers, and journey arcs
- **Dynamic Imports**: Map and globe components use `dynamic()` with SSR disabled for client-side rendering
- **Glassmorphism Design**: CSS custom properties for glass effects and gradients
- **Responsive Grid Systems**: Country, blog, food, and transportation content grids

### Content Organization
- Blog posts organized by year/month in `src/content/blog-posts/` (e.g., `2025-january.ts`)
- Content data files: `blog-data.ts`, `food-data.ts`, `transportation-data.ts`, `vlogs-data.ts`, `packing.ts`
- Content index in `src/content/blogIndex.ts` for metadata organization
- Type definitions in `src/types/blog.ts`
- Blog loading utilities in `src/utils/blog-loader.ts` with caching and dynamic imports

### Styling Approach
- Tailwind CSS 4 with custom CSS properties for theming
- Glassmorphism effects with backdrop-filter
- CSS-in-JS theme variables for light/dark mode
- Leaflet CSS imported globally

### Key Dependencies
- **framer-motion**: Animation library
- **three / @react-three/fiber / @react-three/drei**: 3D globe visualization
- **leaflet**: Interactive 2D maps
- **react 19**: Latest React version
- **tailwindcss 4**: Latest Tailwind CSS
- **shadcn/ui**: Component library with Radix UI primitives

### Configuration Notes
- **shadcn/ui**: Configured with "new-york" style, RSC support, and path aliases (@/components, @/lib, @/ui, @/hooks)
- **Image optimization**: Configured for various device sizes with AVIF/WebP formats
- **Security headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Static asset caching**: 1 year max-age for images
- **Leaflet package optimization**: Enabled in Next.js experimental config
- **ESLint rules**: Disable img element warnings and TypeScript strict rules in package.json
- **TypeScript**: Uses @ path alias for src/ directory imports
- **PostCSS**: Configured with Tailwind CSS 4 processor

### Development Patterns
- **Dynamic imports**: Use `dynamic()` from 'next/dynamic' with `ssr: false` for map/globe components
- **3D Globe**: Three.js code isolated in GlobeScene.tsx, lazy loaded via React.lazy() to avoid Turbopack issues
- **Content loading**: Blog posts loaded dynamically by year/month using import() in blog-loader.ts
- **Responsive design**: Mobile-first approach with Tailwind CSS breakpoints
- **Type safety**: All content interfaces defined in src/types/blog.ts
- **Image formats**: All images must be actual JPEG/PNG (not HEIF with .jpg extension) - use `sips -s format jpeg` to convert

### Known Issues
- **Turbopack**: Disabled in Next.js 16 due to compatibility issues with Three.js/React Three Fiber and framer-motion. Webpack is explicitly enabled via `--webpack` flag in package.json scripts.
- **HEIF Images**: iPhone photos saved as .jpg may actually be HEIF format. Convert with: `sips -s format jpeg image.jpg --out image.jpg`
- **React 19 + Radix Slot**: Type compatibility issues between React 19's ref types and Radix UI Slot component. Fixed by casting props to `any` in badge.tsx and button.tsx.