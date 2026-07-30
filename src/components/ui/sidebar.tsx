'use client'

import * as React from 'react'
import { Slot } from 'radix-ui'
import { PanelLeftIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

type SidebarContextValue = {
  isMobile: boolean
  open: boolean
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }
  return context
}

function SidebarProvider({
  defaultOpen = true,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & { defaultOpen?: boolean }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((current) => !current)
      return
    }
    setOpen((current) => !current)
  }, [isMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const value = React.useMemo(
    () => ({
      isMobile,
      open,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [isMobile, open, openMobile, toggleSidebar],
  )

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        data-sidebar-state={open ? 'expanded' : 'collapsed'}
        className={cn('group/sidebar-wrapper flex min-h-svh w-full', className)}
        style={
          {
            '--sidebar-width': '17rem',
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const { isMobile, open, openMobile, setOpenMobile } = useSidebar()

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className={cn(
            'w-[min(21rem,calc(100vw-1rem))] border-sidebar-border bg-sidebar p-0 text-sidebar-foreground',
            className,
          )}
          {...props}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Travel timeline</SheetTitle>
            <SheetDescription>Browse posts by year and month.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full min-h-0 flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <>
      <div
        aria-hidden
        className={cn(
          'relative w-(--sidebar-width) shrink-0 transition-[width] duration-200 ease-out',
          !open && 'w-0',
        )}
      />
      <aside
        data-slot="sidebar"
        data-state={open ? 'expanded' : 'collapsed'}
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-(--sidebar-width) flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-out',
          !open && '-translate-x-full',
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn('flex shrink-0 flex-col gap-2 p-3', className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain p-2',
        className,
      )}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        'flex shrink-0 flex-col gap-2 border-t border-sidebar-border p-3',
        className,
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-inset"
      className={cn(
        'relative flex min-w-0 flex-1 flex-col bg-background',
        className,
      )}
      {...props}
    />
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={className}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle navigation</span>
    </Button>
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn('flex min-w-0 flex-col gap-1', className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn('relative min-w-0', className)}
      {...props}
    />
  )
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
}) {
  const Component = asChild ? Slot.Root : 'button'

  return (
    <Component
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        'flex h-9 w-full min-w-0 items-center gap-2.5 rounded-lg px-2.5 text-left text-sm text-sidebar-foreground/72 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        'ml-4 flex min-w-0 flex-col gap-0.5 border-l border-sidebar-border pl-2',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={cn('min-w-0', className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
  isActive?: boolean
}) {
  const Component = asChild ? Slot.Root : 'a'

  return (
    <Component
      data-slot="sidebar-menu-sub-button"
      data-active={isActive}
      className={cn(
        'flex min-h-8 min-w-0 items-center gap-2 rounded-md px-2 text-sm text-sidebar-foreground/62 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
}
