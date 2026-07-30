'use client'

import { Children } from 'react'

export function JournalWorkspace({
  children,
  detail,
}: {
  children: React.ReactNode
  detail: React.ReactNode
}) {
  return (
    <div className="relative h-full min-w-0">
      <div
        id="main-content"
        data-context-surface
        className="h-full min-w-0 overflow-y-auto overscroll-contain"
      >
        {Children.toArray(children)}
      </div>

      {Children.toArray(detail)}
    </div>
  )
}
