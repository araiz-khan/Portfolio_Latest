"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

// Browser-chrome colour (mobile address bar / PWA title bar) per theme.
const THEME_COLOR = { dark: "#000000", light: "#ebedf2" } as const

// glisse (and the site's glass rules) read the theme from `data-theme` on
// <html>, while next-themes toggles a `dark`/`light` class. This runs inline,
// right after next-themes' own blocking script has set the class and before
// anything paints, so the very first frame already has matching glass (no
// flash of light-mode glass on a dark page while JavaScript loads). Dark is
// the fallback.
const SYNC_DATA_THEME = `!function(){try{var d=document.documentElement,t=d.classList.contains('light')?'light':'dark';d.setAttribute('data-theme',t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'${THEME_COLOR.light}':'${THEME_COLOR.dark}')}catch(e){}}()`

/** Keeps `data-theme` and the browser-chrome colour in step with the toggle. */
function GlassThemeSync() {
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    if (resolvedTheme !== "dark" && resolvedTheme !== "light") return
    document.documentElement.setAttribute("data-theme", resolvedTheme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[resolvedTheme])
  }, [resolvedTheme])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {/* must stay first: runs synchronously after next-themes' script */}
      <script dangerouslySetInnerHTML={{ __html: SYNC_DATA_THEME }} />
      <GlassThemeSync />
      {children}
    </NextThemesProvider>
  )
}
