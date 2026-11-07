"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Button as GlassButton, Glass } from "glisse"

import { cn } from "@/lib/utils"
import { useGlassPress } from "./use-glass-press"

// Same API as the old shadcn Button (variant / size / asChild), rendered with
// glisse's Liquid Glass button. `default` is the filled primary action; every
// other variant is clear glass.
type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type Size = "default" | "sm" | "lg" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant | null
  size?: Size | null
  asChild?: boolean
}

const sizeClasses: Record<Size, string> = {
  default: "h-10 text-sm [&_svg]:size-4",
  sm: "h-9 text-[13px] [&_svg]:size-4",
  lg: "h-12 rounded-3xl text-base [&_svg]:size-5",
  icon: "h-10 w-10 [&_svg]:size-5",
}

// Horizontal padding moves onto the inner link for `asChild`, so the whole
// pill stays clickable.
const linkPadding: Record<Size, string> = {
  default: "px-4",
  sm: "px-3.5",
  lg: "px-7",
  icon: "px-0",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const v: Variant = variant ?? "default"
    const s: Size = size ?? "default"
    const glassVariant = v === "default" ? "filled" : "glass"
    const destructive = v === "destructive"
    // Link buttons get the same press spring + glow as glisse's own Button.
    const shellRef = React.useRef<HTMLDivElement>(null)
    useGlassPress(shellRef)

    if (asChild) {
      // glisse's Button is always a <button>. For links we keep the real
      // <a>/<Link> (navigation, new tabs, downloads, SEO) inside a glisse Glass
      // shell that carries the same button styles, refraction and press feel.
      return (
        <Glass
          ref={shellRef}
          className={cn("lg-button p-0", sizeClasses[s], "font-medium", className)}
          data-variant={glassVariant === "filled" ? "filled" : undefined}
          data-destructive={destructive ? "" : undefined}
          data-icon={s === "icon" ? "only" : undefined}
        >
          <Slot
            ref={ref as React.Ref<HTMLElement>}
            // Links are natively draggable: holding one and moving starts a URL
            // drag, which cancels the pointer and kills the press stretch.
            draggable={false}
            className={cn(
              "inline-flex h-full w-full items-center justify-center gap-2 whitespace-nowrap rounded-[inherit] text-inherit no-underline",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lg-ring)]",
              linkPadding[s],
            )}
            {...(props as React.HTMLAttributes<HTMLElement>)}
          >
            {children}
          </Slot>
        </Glass>
      )
    }

    return (
      <GlassButton
        ref={ref}
        variant={glassVariant}
        destructive={destructive}
        className={cn(sizeClasses[s], s === "icon" ? "" : linkPadding[s], "font-medium", className)}
        {...(s === "icon" ? { "data-icon": "only" } : {})}
        {...props}
      >
        {children}
      </GlassButton>
    )
  }
)
Button.displayName = "Button"

export { Button }
