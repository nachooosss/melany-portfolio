import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

type Options = {
  /** Multiplicador de atracción. 0.2 = sutil, 0.5 = fuerte. Default 0.3. */
  strength?: number
  /** Radio de detección en px. Solo activa si el cursor entra a este radio. Default 120. */
  radius?: number
}

/**
 * Hook reutilizable para efecto "magnetic": el elemento se desplaza hacia el
 * cursor cuando éste se acerca, dando sensación de atracción gravitacional.
 *
 * Uso:
 *   const { ref, x, y } = useMagnetic({ strength: 0.3 })
 *   <motion.button ref={ref} style={{ x, y }} />
 *
 * Solo se activa en dispositivos con pointer fino (mouse, no touch).
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.3,
  radius = 120,
}: Options = {}) {
  const ref = useRef<T>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.4 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const distance = Math.hypot(dx, dy)

      if (distance < radius) {
        x.set(dx * strength)
        y.set(dy * strength)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    const handleLeave = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [radius, strength, x, y])

  return { ref, x: springX, y: springY }
}
