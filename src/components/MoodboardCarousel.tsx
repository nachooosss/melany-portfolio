import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import Lightbox from './Lightbox'
import type { Project } from '../data/cv'

type Props = {
  images: string[]
  alt: string
  /** Contenido overlay (año, fechas, etc.) que se renderiza encima del fondo. */
  children?: React.ReactNode
  /** Intervalo del autoplay en ms. Por defecto 4500. */
  intervalMs?: number
}

/**
 * Carrusel CSS-puro basado en :nth-child + reordenamiento de DOM.
 * - El orden de los <li> dicta la posición visual (sin estado React para el índice).
 * - Slots 1+2 ocupan full-cover; slot 2 paintea encima de slot 1 por DOM order.
 * - Slot 3+4 son thumbs visibles abajo a la izquierda.
 * - Slot 5 es "exit": invisible, ahí va a parar la imagen activa al rotar.
 * - Transition anima left/top/width/height; el resto cambia instantáneamente.
 *
 * Click en la imagen o en un thumb → abre lightbox para ver en grande.
 */
export default function MoodboardCarousel({
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

  const advance = () => {
    const slider = sliderRef.current
    if (!slider) return
    const items = slider.querySelectorAll<HTMLLIElement>('.moodboard-item')
    if (items.length === 0) return
    slider.append(items[0])
    setActiveIndex((p) => (p + 1) % images.length)
  }

  const retreat = () => {
    const slider = sliderRef.current
    if (!slider) return
    const items = slider.querySelectorAll<HTMLLIElement>('.moodboard-item')
    if (items.length === 0) return
    slider.prepend(items[items.length - 1])
    setActiveIndex((p) => (p - 1 + images.length) % images.length)
  }

  const startAutoplay = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (intervalRef.current) return
    intervalRef.current = window.setInterval(advance, intervalMs)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    startAutoplay()
    return stopAutoplay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lightboxItems: Project[] = images.map((src, i) => ({
    src,
    alt: `${alt} — ${i + 1} de ${images.length}`,
    title: '',
    description: '',
  }))

  const handleLightboxPrev = () =>
    setActiveIndex((p) => (p - 1 + images.length) % images.length)
  const handleLightboxNext = () =>
    setActiveIndex((p) => (p + 1) % images.length)

  return (
    <>
      <div
        className="moodboard-carousel"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        onTouchStart={stopAutoplay}
        onTouchEnd={startAutoplay}
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

        <button
          type="button"
          onClick={() => {
            stopAutoplay()
            setLightboxOpen(true)
          }}
          aria-label="Ver imagen en grande"
          className="moodboard-zoom"
        >
          <Maximize2 size={14} strokeWidth={1.8} />
          <span>Ver en grande</span>
        </button>

        <nav className="moodboard-nav" aria-label="Navegación del moodboard">
          <button
            type="button"
            onClick={retreat}
            aria-label="Imagen anterior"
            className="moodboard-btn"
          >
            <ChevronLeft size={16} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={advance}
            aria-label="Imagen siguiente"
            className="moodboard-btn"
          >
            <ChevronRight size={16} strokeWidth={1.8} />
          </button>
        </nav>
      </div>

      <Lightbox
        open={lightboxOpen}
        items={lightboxItems}
        index={activeIndex}
        onClose={() => {
          setLightboxOpen(false)
          startAutoplay()
        }}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />
    </>
  )
}
