// src/components/ui/theme-switch-toggler.jsx
// Theme toggle — applies 'dark' class to <html>, persists in localStorage

import { useState, useEffect } from 'react'

export function ThemeSwitcherToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      aria-label="Toggle theme"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        relative w-11 h-6 rounded-full border transition-colors duration-300
        ${dark
          ? 'bg-amber-400 border-amber-400'
          : 'bg-stone-200 border-stone-300'}
        flex items-center
      `}
    >
      {/* Knob */}
      <span
        className={`
          absolute w-5 h-5 rounded-full shadow transition-all duration-300 flex items-center justify-center text-[11px]
          ${dark ? 'translate-x-5 bg-stone-900' : 'translate-x-0.5 bg-white'}
        `}
      >
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
