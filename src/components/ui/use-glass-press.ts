"use client"

import { useEffect, type RefObject } from "react"

// The press feel of glisse's <Button>, for glass elements glisse doesn't render
// itself (our link buttons: social icons, CV download, project links…). On
// press the pane lights up under the pointer (`data-pressed` + --lg-x/--lg-y
// drive glisse's own :after glow), swells a touch, rubber-bands toward a drag,
// and springs back on release.
//
// Ported from glisse's internal `usePress` and spring (MIT, Kelvin Zhang,
// https://github.com/0kzh/glisse), which the package doesn't export. The
// constants match glisse's so both kinds of button feel identical.

type Feel = { grow: number; press: [number, number]; release: [number, number] }

const POINTER: Feel = { grow: 6, press: [417.6, 29.2], release: [230, 23.7] }
const TOUCH: Feel = { grow: 15, press: [515, 27.3], release: [250, 11.8] }

type Spring = { value: number; target: number; velocity: number; stiffness: number; damping: number }

// Closed-form damped spring step, as in glisse.
function advance(s: Spring, dt: number) {
  const x = s.value - s.target
  const v = s.velocity
  const half = s.damping / 2
  const discriminant = half * half - s.stiffness
  if (Math.abs(discriminant) < 1e-4) {
    const decay = Math.exp(-half * dt)
    const b = v + half * x
    s.value = s.target + decay * (x + b * dt)
    s.velocity = decay * (v - half * b * dt)
  } else if (discriminant > 0) {
    const root = Math.sqrt(discriminant)
    const r1 = -half + root
    const r2 = -half - root
    const a = (v - r2 * x) / (r1 - r2)
    const b = x - a
    s.value = s.target + a * Math.exp(r1 * dt) + b * Math.exp(r2 * dt)
    s.velocity = a * r1 * Math.exp(r1 * dt) + b * r2 * Math.exp(r2 * dt)
  } else {
    const omega = Math.sqrt(-discriminant)
    const decay = Math.exp(-half * dt)
    const cos = Math.cos(omega * dt)
    const sin = Math.sin(omega * dt)
    s.value = s.target + decay * (x * cos + ((v + half * x) / omega) * sin)
    s.velocity = decay * (v * cos - ((half * v + s.stiffness * x) / omega) * sin)
  }
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function useGlassPress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    // scale-x, scale-y, translate-x, translate-y
    const springs: Spring[] = [1, 1, 0, 0].map((value) => ({
      value,
      target: value,
      velocity: 0,
      stiffness: POINTER.release[0],
      damping: POINTER.release[1],
    }))
    let frame = 0
    let last = 0

    const paint = () => {
      const [sx, sy, tx, ty] = springs.map((s) => s.value)
      el.style.scale = `${sx} ${sy}`
      el.style.translate = `${tx}px ${ty}px`
    }

    const tick = (time: number) => {
      const dt = Math.min(0.1, Math.max(0, (time - last) / 1000))
      last = time
      let moving = false
      for (const s of springs) {
        advance(s, dt)
        if (Math.abs(s.value - s.target) < 1e-4 && Math.abs(s.velocity) < 0.001) {
          s.value = s.target
          s.velocity = 0
        } else {
          moving = true
        }
      }
      paint()
      frame = moving ? requestAnimationFrame(tick) : 0
    }

    const target = (next: number[], [stiffness, damping]: [number, number]) => {
      springs.forEach((s, i) => {
        s.stiffness = stiffness
        s.damping = damping
        s.target = next[i] ?? 0
      })
      if (document.hidden || reducedMotion()) {
        springs.forEach((s) => {
          s.value = s.target
          s.velocity = 0
        })
        paint()
        return
      }
      if (!frame) {
        last = performance.now()
        frame = requestAnimationFrame(tick)
      }
    }

    let pointer: { id: number; x: number; y: number; box: DOMRect; feel: Feel } | null = null

    const track = (event: PointerEvent) => {
      if (!pointer) return
      const { box, feel } = pointer
      el.style.setProperty("--lg-x", `${((event.clientX - box.left) / box.width) * 100}%`)
      el.style.setProperty("--lg-y", `${((event.clientY - box.top) / box.height) * 100}%`)
      const { width, height } = box
      const base = 1 + feel.grow / Math.max(width, height)
      const aspect = width / height
      const dx = (event.clientX - pointer.x) / aspect
      const dy = event.clientY - pointer.y
      const length = Math.hypot(dx, dy)
      if (!length) return target([base, base, 0, 0], feel.press)
      const nx = dx / length
      const ny = dy / length
      const rubber = 1 - 1 / (1 + length / height / (5 * aspect))
      const stretch = 1 + (6 / height) * rubber * Math.abs(Math.abs(nx) - Math.abs(ny))
      const horizontal = Math.abs(nx) > Math.abs(ny)
      target(
        [
          base * (horizontal ? stretch : 1 / stretch),
          base * (horizontal ? 1 / stretch : stretch),
          nx * 8 * rubber,
          ny * 8 * rubber,
        ],
        feel.press,
      )
    }

    const move = (event: PointerEvent) => {
      if (event.pointerId === pointer?.id) track(event)
    }
    const end = (event?: PointerEvent) => {
      if (event && event.pointerId !== pointer?.id) return
      const feel = pointer?.feel ?? POINTER
      pointer = null
      delete el.dataset.pressed
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", end)
      window.removeEventListener("pointercancel", end)
      target([1, 1, 0, 0], feel.release)
    }
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || pointer) return
      pointer = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        box: el.getBoundingClientRect(),
        feel: event.pointerType === "mouse" ? POINTER : TOUCH,
      }
      el.dataset.pressed = ""
      window.addEventListener("pointermove", move)
      window.addEventListener("pointerup", end)
      window.addEventListener("pointercancel", end)
      track(event)
    }
    const reset = () => end()

    el.addEventListener("pointerdown", down)
    window.addEventListener("blur", reset)
    return () => {
      end()
      cancelAnimationFrame(frame)
      el.removeEventListener("pointerdown", down)
      window.removeEventListener("blur", reset)
      el.style.removeProperty("scale")
      el.style.removeProperty("translate")
    }
  }, [ref])
}
