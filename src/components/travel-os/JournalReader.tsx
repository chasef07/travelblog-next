'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { X } from 'lucide-react'

import { useWideWorkspace } from '@/components/travel-os/JournalWorkspace'
import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  claimDetailNavigation,
  closeDetail,
  restoreDetailFocus,
} from '@/lib/journal-detail-history'

function ReaderViewport({
  children,
  contentRef,
}: {
  children: React.ReactNode
  contentRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={contentRef}
      data-detail-scroll
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
    >
      {children}
    </div>
  )
}

export function JournalReader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isWide = useWideWorkspace()
  const contentRef = useRef<HTMLDivElement>(null)

  const focusTitle = useCallback(() => {
    contentRef.current
      ?.querySelector<HTMLElement>('[data-detail-title]')
      ?.focus({ preventScroll: true })
  }, [])

  const close = useCallback(() => {
    closeDetail(() => router.back())
  }, [router])

  useEffect(() => {
    claimDetailNavigation(pathname)
    const frame = requestAnimationFrame(focusTitle)
    return () => cancelAnimationFrame(frame)
  }, [focusTitle, pathname])

  useEffect(
    () => () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!document.querySelector('[data-journal-reader]')) {
            restoreDetailFocus()
          }
        })
      })
    },
    [],
  )

  useEffect(() => {
    if (!isWide) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return

      event.preventDefault()
      close()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [close, isWide])

  if (isWide) {
    return (
      <>
        <ResizableHandle withHandle />
        <ResizablePanel id="journal-detail" defaultSize="54%" minSize={500}>
          <aside
            data-journal-reader
            aria-label="Journal detail"
            className="relative flex h-full min-w-0 flex-col bg-background"
          >
            <div className="flex h-12 shrink-0 items-center justify-end border-b px-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={close}
                aria-label="Close detail"
              >
                <X />
              </Button>
            </div>
            <ReaderViewport contentRef={contentRef}>{children}</ReaderViewport>
          </aside>
        </ResizablePanel>
      </>
    )
  }

  return (
    <Sheet
      open
      onOpenChange={(open) => {
        if (!open) close()
      }}
    >
      <SheetContent
        data-journal-reader
        side="right"
        className="w-full max-w-none gap-0 p-0 transition duration-200 data-[state=closed]:duration-200 data-[state=open]:duration-200 motion-reduce:transition-none sm:w-[min(92vw,48rem)] sm:max-w-none"
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          requestAnimationFrame(focusTitle)
        }}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Journal detail</SheetTitle>
          <SheetDescription>The selected journal resource.</SheetDescription>
        </SheetHeader>
        <ReaderViewport contentRef={contentRef}>{children}</ReaderViewport>
      </SheetContent>
    </Sheet>
  )
}
