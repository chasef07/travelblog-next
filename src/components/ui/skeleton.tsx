import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse bg-[var(--ui-bg-soft)] rounded', className)}
      {...props}
    />
  )
}

// Skeleton specifically for blog/content cards
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-[var(--ui-bg-strong)]', className)}>
      {/* Image placeholder */}
      <Skeleton className="h-48 w-full rounded-none" />
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Date */}
        <Skeleton className="h-3 w-24" />
        {/* Title */}
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        {/* Excerpt */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        {/* Read more */}
        <Skeleton className="h-3 w-16 mt-2" />
      </div>
    </div>
  )
}

// Grid skeleton for blog/food pages
function GridSkeleton({
  count = 6,
  columns = 'md:grid-cols-2 lg:grid-cols-3',
}: {
  count?: number
  columns?: string
}) {
  return (
    <div
      className={cn(
        'grid gap-px bg-[var(--ui-border-subtle)] border border-[var(--ui-border-subtle)]',
        columns,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

// Filter buttons skeleton
function FilterSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-16 rounded-none" />
      ))}
      <Skeleton className="h-9 w-20 ml-auto rounded-none" />
    </div>
  )
}

export { Skeleton, CardSkeleton, GridSkeleton, FilterSkeleton }
