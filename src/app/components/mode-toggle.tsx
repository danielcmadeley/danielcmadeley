'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent rendering during SSR
  }

  return (
    <div className="text-sm w-64 flex justify-between uppercase">
      <span className="text-neutral-500">Theme</span>
      <div className="flex items-center justify-center space-x-2">
        <span
          onClick={() => setTheme('light')}
          className={`cursor-pointer ${theme === 'light' ? 'text-neutral-50' : 'text-neutral-500'}`}
        >
          Light
        </span>
        <span className="text-neutral-500">{'//'}</span>
        <span
          onClick={() => setTheme('dark')}
          className={`cursor-pointer ${theme === 'dark' ? 'text-neutral-50' : 'text-neutral-500'}`}
        >
          Dark
        </span>
      </div>
    </div>
  )
}
