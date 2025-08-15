# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (dev mode)
- `npm run build` - Build production bundle and check for build errors
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality and style

## Architecture Overview

This is a Next.js 15 travel blog application called "Lone Horizons" featuring:

### Core Structure
- **App Router**: Uses Next.js 15 App Router with TypeScript
- **Theme System**: Dynamic theme switching with CSS custom properties and data attributes
- **Interactive Map**: Leaflet-based journey visualization with dynamic imports
- **Content Management**: Static content stored in TypeScript files under `src/content/`

### Key Components
- **Dynamic Imports**: Map components use `dynamic()` with SSR disabled for client-side rendering
- **Theme Toggle**: Custom theme system with localStorage persistence and system preference detection
- **Glassmorphism Design**: CSS custom properties for glass effects and gradients
- **Responsive Grid Systems**: Country, blog, food, and transportation content grids

### Content Organization
- Blog posts organized by year/month in `src/content/blog-posts/`
- Content data files: `blog-data.ts`, `food-data.ts`, `transportation-data.ts`, `vlogs-data.ts`
- Type definitions in `src/types/blog.ts`
- Blog loading utilities in `src/utils/blog-loader.ts`

### Styling Approach
- Tailwind CSS 4 with custom CSS properties for theming
- Glassmorphism effects with backdrop-filter
- CSS-in-JS theme variables for light/dark mode
- Leaflet CSS imported globally

### Key Dependencies
- **framer-motion**: Animation library
- **leaflet**: Interactive maps
- **react 19**: Latest React version
- **tailwindcss 4**: Latest Tailwind CSS

### Configuration Notes
- **shadcn/ui**: Configured with "new-york" style, RSC support, and path aliases (@/components, @/lib)
- **Image optimization**: Configured for various device sizes with AVIF/WebP formats
- **Security headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Static asset caching**: 1 year max-age for images
- **Leaflet package optimization**: Enabled in Next.js experimental config
- **ESLint rules**: Disable img element warnings and TypeScript strict rules in package.json
- **TypeScript**: Uses @ path alias for src/ directory imports

### Development Patterns
- **Dynamic imports**: Use `dynamic()` from 'next/dynamic' with `ssr: false` for map components
- **Theme system**: Uses CSS custom properties with `[data-theme="dark"]` selector
- **Content loading**: Blog posts loaded dynamically by year/month using import() in blog-loader.ts
- **Responsive design**: Mobile-first approach with Tailwind CSS breakpoints
- **Type safety**: All content interfaces defined in src/types/blog.ts