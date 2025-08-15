import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { generateBreadcrumbJsonLd } from '@/lib/seo'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * SEO-optimized breadcrumb navigation with structured data
 * Improves navigation and provides search engines with page hierarchy
 */
export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Always include home as first item
  const allItems = [
    { name: 'Home', href: '/' },
    ...items
  ]

  // Generate JSON-LD for breadcrumbs
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    allItems.map(item => ({
      name: item.name,
      url: `https://chasefagen.com${item.href}`
    }))
  )

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* Breadcrumb navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}
      >
        <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center space-x-2" 
                itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content={String(index + 1)} />
              
              {index === 0 ? (
                <Link 
                  href={item.href}
                  className="flex items-center hover:text-primary transition-colors"
                  itemProp="item"
                >
                  <Home className="w-4 h-4" />
                  <span className="sr-only" itemProp="name">Home</span>
                </Link>
              ) : index === allItems.length - 1 ? (
                <span 
                  className="font-medium text-foreground" 
                  itemProp="name"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="hover:text-primary transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              
              {index < allItems.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground/60" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

/**
 * Utility to generate breadcrumb items for blog posts
 */
export function generateBlogBreadcrumbs(year: string, slug: string, title?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Blog', href: '/blog' },
    { name: year, href: `/blog/${year}` }
  ]

  if (title) {
    items.push({ name: title, href: `/blog/${year}/${slug}` })
  }

  return items
}

/**
 * Utility to generate breadcrumb items for content sections
 */
export function generateSectionBreadcrumbs(section: string, subsection?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: capitalizeFirst(section), href: `/${section}` }
  ]

  if (subsection) {
    items.push({ name: capitalizeFirst(subsection), href: `/${section}/${subsection}` })
  }

  return items
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}