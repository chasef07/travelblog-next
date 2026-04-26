# 🌍 The Value Engine - Travel Blog

A modern, interactive travel blog built with Next.js 15, showcasing adventures across 20 countries with an interactive 3D globe, world-class SEO, and performance optimizations.

## ✨ Features

### 🎨 **Modern Design System**

- **Dynamic Theme Switching** - Light/dark mode with CSS custom properties
- **Glassmorphism Effects** - Beautiful backdrop-filter designs
- **Framer Motion Animations** - Smooth, progressive loading animations
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### 📱 **Interactive Components**

- **Interactive 3D Globe** - Three.js/React Three Fiber globe with journey arcs and location markers
- **Travel Stories** - Filterable blog posts with country/year filters
- **Interactive Map** - Leaflet-based journey visualization
- **Food Experiences** - Country-organized culinary adventures
- **Transportation Guide** - Ranked transport experiences with scoring
- **Video Vlogs** - Embedded travel videos
- **Packing Checklist** - Interactive packing guide

### 🚀 **Performance & SEO**

- **Next.js 15 App Router** - Latest React 19 with Server Components
- **Image Optimization** - AVIF/WebP formats with lazy loading
- **Dynamic Imports** - Code splitting for optimal loading
- **SEO Optimized** - Meta tags, structured data, sitemaps
- **Core Web Vitals** - Optimized for Google rankings

### 📊 **Content Management**

- **TypeScript Content** - Type-safe blog posts and metadata
- **Dynamic Loading** - Blog posts loaded by year/month
- **Search & Filter** - Advanced filtering by location and date
- **Reading Time** - Automatic calculation for blog posts

## 🛠️ Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type safety throughout
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animation library

### **UI Components**

- **Shadcn/ui** - Modern component library
- **Three.js / React Three Fiber** - 3D globe visualization
- **Leaflet** - Interactive 2D maps
- **Next/Image** - Optimized image handling
- **Dynamic Imports** - Progressive loading

### **Performance**

- **Webpack** - Production-ready builds (Turbopack has compatibility issues with Three.js)
- **Image Optimization** - Automatic format conversion
- **Code Splitting** - Dynamic component loading
- **Caching** - Strategic asset caching

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- npm, yarn, or pnpm

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd travelblog-next

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### **Available Scripts**

```bash
# Development (using pnpm)
pnpm dev             # Start development server (Webpack)
pnpm build           # Build production bundle
pnpm start           # Start production server
pnpm lint            # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Travel blog pages
│   ├── food/              # Food experiences
│   ├── transportation/    # Transport guide
│   ├── packing-checklist/ # Packing guide
│   └── vlogs/             # Video content
├── components/            # React components
│   ├── InteractiveGlobe.tsx  # 3D globe wrapper
│   ├── GlobeScene.tsx     # Three.js globe scene
│   ├── Header.tsx         # Navigation header
│   └── ui/                # Shadcn UI components
├── content/               # Content and data
│   ├── blog-posts/        # Blog post content by month
│   ├── blog-data.ts       # Blog metadata
│   ├── food-data.ts       # Food experience data
│   └── transportation-data.ts
├── types/                 # TypeScript definitions
├── utils/                 # Utility functions
├── lib/                   # Configuration and helpers
└── styles/                # Global styles
```

## 📝 Content Management

### **Adding Blog Posts**

1. **Create Monthly File**: Add to `src/content/blog-posts/YYYY-month.ts`
2. **Update Index**: Add metadata to `src/content/blogIndex.ts`
3. **Add Images**: Place in `public/assets/images/`

### **Blog Post Format**

```typescript
export const monthYearPosts: BlogPost[] = [
  {
    id: 'unique-slug',
    title: 'Post Title',
    date: '2024-01-01',
    location: 'City, Country',
    slug: 'unique-slug',
    year: '2024',
    excerpt: 'Brief description...',
    content: `Full content with markdown support...`,
    images: [{ src: '/assets/images/path.jpg', alt: 'Description' }],
  },
]
```

### **Adding Food/Transport Experiences**

Update the respective data files in `src/content/` with new entries following the existing TypeScript interfaces.

## 🎨 Styling & Theming

### **CSS Custom Properties**

The app uses CSS custom properties for theming:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #7c3aed;
  --surface-color: #ffffff;
  --text-color: #1f2937;
  --muted-text-color: #6b7280;
}

[data-theme='dark'] {
  --surface-color: #1f2937;
  --text-color: #f9fafb;
  /* ... */
}
```

### **Tailwind Configuration**

- Custom color palette
- Typography scale
- Animation utilities
- Responsive breakpoints

## 🌍 Deployment

### **Vercel (Recommended)**

```bash
# Deploy to Vercel
npm run build
# Push to GitHub and connect to Vercel
```

### **Other Platforms**

```bash
# Build for production
npm run build
npm run start

# Static export (if needed)
npm run build && npm run export
```

## 🔧 Configuration

### **Environment Variables**

Create `.env.local` for environment-specific settings:

```env
# Optional
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
```

For Vercel deployment, add these environment variables in your Vercel dashboard.

### **SEO Configuration**

Update `src/lib/seo.ts` with your site metadata:

```typescript
export const siteConfig = {
  name: 'Your Travel Blog',
  description: 'Amazing travel adventures...',
  url: 'https://your-domain.com',
}
```

## 📊 Performance

### **Lighthouse Scores**

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### **Core Web Vitals**

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Hosting and deployment platform
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Beautiful animations
- **shadcn/ui** - Modern component library

---

Built with ❤️ by [Chase Fagen](https://github.com/chasefagen) - Follow the journey across 20 countries!
