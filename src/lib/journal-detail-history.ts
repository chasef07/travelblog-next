const detailStateKey = 'journalDetail'

type DetailHistoryEntry = {
  depth: number
}

type PendingNavigation = DetailHistoryEntry & {
  destination: string
}

let pendingNavigation: PendingNavigation | null = null
let focusTargetIds: string[] = []

function currentDetailEntry(): DetailHistoryEntry | undefined {
  const state = window.history.state
  if (!state || typeof state !== 'object') return

  const entry = (state as Record<string, unknown>)[detailStateKey]
  if (!entry || typeof entry !== 'object') return

  const { depth } = entry as Record<string, unknown>
  if (!Number.isSafeInteger(depth) || Number(depth) < 1) {
    return
  }

  return { depth: Number(depth) }
}

export function stageDetailNavigation(destination: string, targetId: string) {
  const currentEntry = currentDetailEntry()
  pendingNavigation = {
    destination,
    depth: (currentEntry?.depth ?? 0) + 1,
  }
  focusTargetIds = currentEntry
    ? [...focusTargetIds.filter((id) => id !== targetId), targetId]
    : [targetId]
}

export function claimDetailNavigation(pathname: string) {
  if (!pendingNavigation || pendingNavigation.destination !== pathname) return

  const { depth } = pendingNavigation
  pendingNavigation = null
  const state =
    window.history.state && typeof window.history.state === 'object'
      ? window.history.state
      : {}

  window.history.replaceState({ ...state, [detailStateKey]: { depth } }, '')
}

export function closeDetail(fallback: () => void) {
  const entry = currentDetailEntry()
  if (!entry) {
    fallback()
    return
  }

  window.history.go(-entry.depth)
}

export function restoreDetailFocus() {
  const target = [...focusTargetIds]
    .reverse()
    .map((targetId) => document.getElementById(targetId))
    .find((element) => element !== null)

  focusTargetIds = []
  target?.focus({ preventScroll: true })
}
