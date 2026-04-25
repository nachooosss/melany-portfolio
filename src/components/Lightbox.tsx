import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../data/cv'
import { useSwipe } from '../hooks/useSwipe'

type Props = {
  open: boolean
  items: Project[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({
  open,
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, onPrev, onNext])

  // Swipe horizontal en mobile
  const swipe = useSwipe({
    onSwipeLeft: () => index < items.length - 1 && onNext(),
    onSwipeRight: () => index > 0 && onPrev(),
  })

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada"
          style={{
            background: 'rgba(28, 25, 23, 0.92)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
        >
          {/* Cerrar */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Cerrar"
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 h-12 w-12 border border-bg/30 text-bg hover:bg-bg hover:text-ink transition-colors flex items-center justify-center"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {/* Flechas laterales — solo desktop */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            disabled={index === 0}
            aria-label="Anterior"
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 h-14 w-14 border border-bg/30 text-bg hover:bg-bg hover:text-ink transition-colors items-center justify-center disabled:opacity-30"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            disabled={index === items.length - 1}
            aria-label="Siguiente"
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 h-14 w-14 border border-bg/30 text-bg hover:bg-bg hover:text-ink transition-colors items-center justify-center disabled:opacity-30"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>

          {/* Contenido centrado: imagen + paginación debajo */}
          <div
            className="relative flex flex-col items-center gap-5 max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={swipe.onTouchStart}
            onTouchEnd={swipe.onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={items[index].src}
                src={items[index].src}
                alt={items[index].alt}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-full max-h-[72vh] md:max-h-[80vh] object-contain shadow-2xl select-none"
                draggable={false}
              />
            </AnimatePresence>

            {/* Paginación debajo de la imagen */}
            <div className="flex items-center gap-4 md:gap-5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onPrev()
                }}
                disabled={index === 0}
                aria-label="Anterior"
                className="md:hidden flex items-center justify-center h-11 w-11 border border-bg/40 text-bg active:bg-bg active:text-ink transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={20} strokeWidth={1.6} />
              </button>

              <span className="text-bg text-xs md:text-sm uppercase tracking-[0.3em] font-mono whitespace-nowrap">
                {String(index + 1).padStart(2, '0')}
                <span className="opacity-50 mx-2">/</span>
                {String(items.length).padStart(2, '0')}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onNext()
                }}
                disabled={index === items.length - 1}
                aria-label="Siguiente"
                className="md:hidden flex items-center justify-center h-11 w-11 border border-bg/40 text-bg active:bg-bg active:text-ink transition-colors disabled:opacity-30"
              >
                <ChevronRight size={20} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
