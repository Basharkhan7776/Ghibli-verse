"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme} data-theme={theme} aria-label="Toggle theme">
      <div className="theme-toggle-thumb">
        {theme === "dark" ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
      </div>
    </button>
  )
}
