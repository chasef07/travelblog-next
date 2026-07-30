'use client'

import { Children, createContext, useContext, useEffect, useState } from 'react'

import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

const wideWorkspaceQuery = '(min-width: 1180px)'
const WideWorkspaceContext = createContext(false)

export function useWideWorkspace() {
  return useContext(WideWorkspaceContext)
}

function useWideWorkspaceQuery() {
  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(wideWorkspaceQuery)
    const update = () => setIsWide(query.matches)

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isWide
}

export function JournalWorkspace({
  children,
  detail,
}: {
  children: React.ReactNode
  detail: React.ReactNode
}) {
  const isWide = useWideWorkspaceQuery()

  return (
    <WideWorkspaceContext.Provider value={isWide}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          id="journal-context"
          defaultSize="46%"
          minSize={isWide ? 400 : undefined}
        >
          <div
            id="main-content"
            data-context-surface
            className="h-full min-w-0 overflow-y-auto overscroll-contain"
          >
            {Children.toArray(children)}
          </div>
        </ResizablePanel>

        {Children.toArray(detail)}
      </ResizablePanelGroup>
    </WideWorkspaceContext.Provider>
  )
}
