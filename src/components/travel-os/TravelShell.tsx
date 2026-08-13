'use client'

import { JournalSidebar } from '@/components/travel-os/JournalSidebar'
import { JournalWorkspace } from '@/components/travel-os/JournalWorkspace'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import type { JourneyStop } from '@/content/world-journey'
import type { JournalNavigationYear } from '@/lib/journal'

export function TravelShell({
  children,
  detail,
  years,
  currentLocation,
}: {
  children: React.ReactNode
  detail: React.ReactNode
  years: JournalNavigationYear[]
  currentLocation: Pick<JourneyStop, 'name' | 'stopName'>
}) {
  return (
    <SidebarProvider>
      <JournalSidebar years={years} currentLocation={currentLocation} />
      <SidebarInset className="h-svh overflow-hidden">
        <header className="sticky top-0 z-30 flex h-12 shrink-0 items-center border-b bg-background px-3 md:hidden">
          <SidebarTrigger />
        </header>

        <SidebarTrigger className="absolute left-3 top-3 z-30 hidden md:group-data-[sidebar-state=collapsed]/sidebar-wrapper:inline-flex" />

        <div className="min-h-0 flex-1">
          <JournalWorkspace detail={detail}>{children}</JournalWorkspace>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
