'use client'

import { useEffect, useState } from 'react'

import { applyTheme, Theme } from '@/lib/theme'

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const initial = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

    setTheme(initial)
    applyTheme(initial)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'

    setTheme(next)
    localStorage.setItem('theme', next)
    applyTheme(next)
  }

  if (!theme) return null // SSR-safe

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    </button>
  )
}
