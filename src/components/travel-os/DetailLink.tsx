'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { stageDetailNavigation } from '@/lib/journal-detail-history'
import { cn } from '@/lib/utils'

export function DetailLink({
  detailId,
  className,
  href,
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof Link>, 'href'> & {
  detailId: string
  href: string
}) {
  const pathname = usePathname()
  const targetId = `journal-detail-link-${detailId}`
  const isSelected = pathname === href

  return (
    <Link
      {...props}
      id={targetId}
      href={href}
      aria-current={isSelected ? 'page' : undefined}
      data-selected={isSelected || undefined}
      className={cn(
        className,
        isSelected && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
      )}
      onClick={(event) => {
        onClick?.(event)
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }

        stageDetailNavigation(href, targetId)
      }}
    />
  )
}
