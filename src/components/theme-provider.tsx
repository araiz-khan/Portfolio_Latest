"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

// glisse reads the theme from `data-theme` on <html>, while next-themes here
// toggles a `dark` class. Mirror the resolved theme onto the attribute so the
// glass components (and their refraction rims) follow the site's toggle.
function GlassThemeSync() {
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    if (resolvedTheme === "dark" || resolvedTheme === "light") {
      document.documentElement.setAttribute("data-theme", resolvedTheme)
    }
  }, [resolvedTheme])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <GlassThemeSync />
      {children}
    </NextThemesProvider>
  )
}
