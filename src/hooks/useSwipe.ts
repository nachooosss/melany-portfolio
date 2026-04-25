import { useRef, type TouchEvent } from 'react'

type Options = {
  /** Distancia mínima en px para considerar swipe (default 50) */
  threshold?: number
  /** Callback al detectar swipe izquierdo (siguiente) */
  onSwipeLeft?: () => void
  /** Callback al detectar swipe derecho (anterior) */
  onSwipeRight?: () => void
  /** Callback opcional al iniciar touch (ej: pausar autoplay) */
  onTouchBegin?: () => void
  /** Callback opcional al finalizar touch (ej: reanudar autoplay) */
  onTouchEnd?: () => void
}

/**
 * Hook reutilizable para detectar swipe horizontal con touch.
 * Devuelve handlers para asignar a un elemento + un ref `wasSwipe` que indica
 * si la última interacción fue swipe (útil para no disparar el onClick).
 */
export function useSwipe({
  threshold = 50,
  onSwipeLeft,
  onSwipeRight,
  onTouchBegin,
  onTouchEnd,
}: Options) {
  const startX = useRef<number | null>(null)
  const wasSwipe = useRef(false)

  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX
    wasSwipe.current = false
    onTouchBegin?.()
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (startX.current !== null) {
      const dx = e.changedTouches[0].clientX - startX.current
      if (Math.abs(dx) > threshold) {
        wasSwipe.current = true
        if (dx > 0) onSwipeRight?.()
        else onSwipeLeft?.()
      }
      startX.current = null
    }
    onTouchEnd?.()
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    /** ref.current será true si la última interacción fue swipe (>threshold) */
    wasSwipe,
  }
}
