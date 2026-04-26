'use client'

import { Palette } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type ThemeId = 'light' | 'graphite'

const STORAGE_KEY = 'value-engine-theme'
const LEGACY_STORAGE_KEY = 'living-gambit-theme'

const themes: Array<{ id: ThemeId; label: string; swatch: string }> = [
  {
    id: 'light',
    label: 'Light',
    swatch: 'linear-gradient(135deg, #ffffff, #e0e0e0)',
  },
  {
    id: 'graphite',
    label: 'Dark',
    swatch: 'linear-gradient(135deg, #00e89d, #050507)',
  },
]

function applyTheme(theme: ThemeId) {
  document.documentElement.setAttribute('data-theme', theme)
}

export default function ThemeSwitcher({ className }: { className?: string }) {
  const [activeTheme, setActiveTheme] = useState<ThemeId>('light')

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute(
      'data-theme',
    ) as ThemeId | null
    const storedTheme = localStorage.getItem(STORAGE_KEY) as ThemeId | null
    const legacyTheme = localStorage.getItem(
      LEGACY_STORAGE_KEY,
    ) as ThemeId | null
    const nextTheme: ThemeId =
      currentTheme || storedTheme || legacyTheme || 'light'

    setActiveTheme(nextTheme)
    applyTheme(nextTheme)

    if (!storedTheme && legacyTheme) {
      localStorage.setItem(STORAGE_KEY, legacyTheme)
    }
  }, [])

  const selectTheme = (theme: ThemeId) => {
    setActiveTheme(theme)
    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)
    localStorage.removeItem(LEGACY_STORAGE_KEY)
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-3 py-2',
        className,
      )}
      aria-label="Theme switcher"
    >
      <Palette className="h-4 w-4 text-[var(--ui-text-muted)]" />
      <div className="flex items-center gap-1.5">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => selectTheme(theme.id)}
            className={cn(
              'h-6 w-6 rounded-full border transition-all duration-200',
              activeTheme === theme.id
                ? 'scale-110 border-[var(--ui-border-strong)]'
                : 'border-transparent opacity-70 hover:opacity-100',
            )}
            style={{ background: theme.swatch }}
            aria-label={`Switch to ${theme.label} theme`}
            aria-pressed={activeTheme === theme.id}
            title={theme.label}
          />
        ))}
      </div>
    </div>
  )
}
