import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../data/cv'

type Props = {
  open: boolean
  items: Project[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ open, items, index, onClose, onPrev, onNext }: Props) {
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
            background: 'rgba(28, 25, 23, 0.88)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Cerrar"
            className="absolute top-6 right-6 h-12 w-12 border border-bg/30 text-bg hover:bg-bg hover:text-ink transition-colors flex items-center justify-center"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            disabled={index === 0}
            aria-label="Anterior"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 border border-bg/30 text-bg hover:bg-bg hover:text-ink transition-colors flex items-center justify-center disabled:opacity-30"
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
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 border border-bg/30 text-bg hover:bg-bg hover:text-ink transition-colors flex items-center justify-center disabled:opacity-30"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>

          <AnimatePresence mode="wait">
            <motion.img
              key={items[index].src}
              src={items[index].src}
              alt={items[index].alt}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[92vw] max-h-[86vh] object-contain shadow-2xl"
              draggable={false}
            />
          </AnimatePresence>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-bg text-xs uppercase tracking-[0.25em] font-mono">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
