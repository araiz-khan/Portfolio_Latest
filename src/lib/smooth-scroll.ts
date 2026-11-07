import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * The one smooth scroller for in-page navigation. GSAP owns the motion, so
 * <html> must NOT also have `scroll-behavior: smooth`: the browser would then
 * smooth-scroll every position GSAP writes, and the two fight (stalls/stutter).
 *
 * 0.6s with a strong ease-in-out (power4 ≈ cubic-bezier(0.77, 0, 0.175, 1)),
 * the curve for on-screen movement. Reduced motion jumps straight there.
 *
 * Interruptible: if the visitor scrolls themselves mid-flight, the tween stops
 * and hands control back instead of fighting their input (`autoKill`).
 * `onDone` fires when it lands *or* is interrupted.
 */
export function smoothScrollTo(
  target: Element | number,
  { onDone }: { onDone?: () => void } = {}
) {
  if (typeof window === 'undefined') return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    if (typeof target === 'number') window.scrollTo(0, target);
    else target.scrollIntoView();
    onDone?.();
    return;
  }
  gsap.to(window, {
    scrollTo: { y: target, autoKill: true, onAutoKill: () => onDone?.() },
    duration: 0.6,
    ease: 'power4.inOut',
    overwrite: 'auto',
    onComplete: () => onDone?.(),
    onInterrupt: () => onDone?.(),
  });
}
