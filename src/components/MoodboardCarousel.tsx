import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import Lightbox from './Lightbox'
import type { Project } from '../data/cv'
import { useSwipe } from '../hooks/useSwipe'

type Props = {
  images: string[]
  alt: string
  /** Contenido overlay (año, fechas, etc.) que se renderiza encima del fondo. */
  children?: React.ReactNode
  /** Intervalo del autoplay en ms. Por defecto 4500. */
  intervalMs?: number
}

const SWIPE_THRESHOLD = 50

/**
 * Carrusel CSS-puro basado en :nth-child + reordenamiento de DOM.
 * - El orden de los <li> dicta la posición visual (sin estado React para el índice).
 * - Slots 1+2 ocupan full-cover; slot 2 paintea encima de slot 1 por DOM order.
 * - Slot 3+4 son thumbs visibles abajo a la izquierda.
 * - Slot 5 es "exit": invisible, ahí va a parar la imagen activa al rotar.
 *
 * Click/tap en la imagen → abre lightbox. Swipe lateral en mobile cambia la imagen.
 * Navegación prev/next debajo del carrusel.
 */
function MoodboardCarousel({
  images,
  alt,
  children,
  intervalMs = 4500,
}: Props) {
  const sliderRef = useRef<HTMLUListElement>(null)
  const intervalRef = useRef<number | null>(null)

  // Indice de la imagen visible (slot 2 == imagen "activa") dentro del array
  // original `images`. Arranca en 1 porque inicialmente slot 2 = images[1].
  const [activeIndex, setActiveIndex] = useState(images.length > 1 ? 1 : 0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const advance = useCallback(() => {
    const slider = sliderRef.current
    if (!slider) return
    const items = slider.querySelectorAll<HTMLLIElement>('.moodboard-item')
    if (items.length === 0) return
    slider.append(items[0])
    setActiveIndex((p) => (p + 1) % images.length)
  }, [images.length])

  const retreat = useCallback(() => {
    const slider = sliderRef.current
    if (!slider) return
    const items = slider.querySelectorAll<HTMLLIElement>('.moodboard-item')
    if (items.length === 0) return
    slider.prepend(items[items.length - 1])
    setActiveIndex((p) => (p - 1 + images.length) % images.length)
  }, [images.length])

  const startAutoplay = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (intervalRef.current) return
    intervalRef.current = window.setInterval(advance, intervalMs)
  }, [advance, intervalMs])

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoplay()
    return stopAutoplay
  }, [startAutoplay, stopAutoplay])

  const swipe = useSwipe({
    threshold: SWIPE_THRESHOLD,
    onSwipeLeft: advance,
    onSwipeRight: retreat,
    onTouchBegin: stopAutoplay,
    onTouchEnd: startAutoplay,
  })

  const handleClick = useCallback(() => {
    // Si fue swipe, no abrir lightbox
    if (swipe.wasSwipe.current) {
      swipe.wasSwipe.current = false
      return
    }
    stopAutoplay()
    setLightboxOpen(true)
  }, [swipe.wasSwipe, stopAutoplay])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick],
  )

  const handlePrevClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      retreat()
    },
    [retreat],
  )

  const handleNextClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      advance()
    },
    [advance],
  )

  // Lightbox items derivados — memoizados para no recrear el array en cada render
  const lightboxItems = useMemo<Project[]>(
    () =>
      images.map((src, i) => ({
        src,
        alt: `${alt} — ${i + 1} de ${images.length}`,
        title: '',
        description: '',
      })),
    [images, alt],
  )

  const handleLightboxPrev = useCallback(
    () => setActiveIndex((p) => (p - 1 + images.length) % images.length),
    [images.length],
  )
  const handleLightboxNext = useCallback(
    () => setActiveIndex((p) => (p + 1) % images.length),
    [images.length],
  )
  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false)
    startAutoplay()
  }, [startAutoplay])

  return (
    <>
      <div className="moodboard-wrapper">
        <div
          className="moodboard-carousel"
          role="button"
          tabIndex={0}
          aria-label="Ver imagen en grande"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          onTouchStart={swipe.onTouchStart}
          onTouchEnd={swipe.onTouchEnd}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <ul ref={sliderRef} className="moodboard-slider" aria-label={alt}>
            {images.map((src, i) => (
              <li
                key={src}
                className="moodboard-item"
                role="img"
                aria-label={`${alt} — imagen ${i + 1} de ${images.length}`}
                style={{ backgroundImage: `url('${src}')` }}
              />
            ))}
          </ul>

          {children && <div className="moodboard-overlay">{children}</div>}

          {/* Lupita indicador "click para ampliar" */}
          <span className="moodboard-zoom-hint" aria-hidden>
            <Maximize2 size={14} strokeWidth={1.8} />
            <span>Ampliar</span>
          </span>
        </div>

        {/* Nav prev/next debajo del carrusel */}
        <nav className="moodboard-nav-below" aria-label="Navegación del moodboard">
          <button
            type="button"
            onClick={handlePrevClick}
            aria-label="Imagen anterior"
            className="moodboard-btn"
          >
            <ChevronLeft size={18} strokeWidth={1.8} />
          </button>
          <span className="moodboard-counter">
            {String(activeIndex + 1).padStart(2, '0')}
            <span className="opacity-50 mx-2">/</span>
            {String(images.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={handleNextClick}
            aria-label="Imagen siguiente"
            className="moodboard-btn"
          >
            <ChevronRight size={18} strokeWidth={1.8} />
          </button>
        </nav>
      </div>

      <Lightbox
        open={lightboxOpen}
        items={lightboxItems}
        index={activeIndex}
        onClose={handleLightboxClose}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />
    </>
  )
}

// Memo: si las props (images, alt, intervalMs, children) no cambian, no re-renderiza
export default memo(MoodboardCarousel)
