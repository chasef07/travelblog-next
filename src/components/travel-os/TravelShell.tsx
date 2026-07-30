'use client'

import { JournalSidebar } from '@/components/travel-os/JournalSidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import type { JournalNavigationYear } from '@/lib/journal'

export function TravelShell({
  children,
  years,
  currentLocation,
}: {
  children: React.ReactNode
  years: JournalNavigationYear[]
  currentLocation: string
}) {
  return (
    <SidebarProvider>
      <JournalSidebar years={years} currentLocation={currentLocation} />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-12 shrink-0 items-center border-b bg-background px-3">
          <SidebarTrigger />
        </header>

        <div id="main-content" className="min-h-[calc(100svh-3rem)]">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
