"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {/* Icon swap: fade + slight scale from 0.9 (never from scale(0)), only
          transform and opacity, 200ms on a strong ease-out. */}
      <Sun className="theme-icon h-[1.2rem] w-[1.2rem] rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-90 dark:opacity-0" />
      <Moon className="theme-icon absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-90 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
