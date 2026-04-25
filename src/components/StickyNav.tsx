import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Download } from 'lucide-react'
import Logo from './Logo'
const cvPdfUrl = '/docs/Melany-Santiesteban-CV.pdf'
import { EASE_OUT_EXPO } from '../constants/animation'

const links = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Contacto', href: '#contact' },
]

export default function StickyNav() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    if (latest < 400) {
      setVisible(false)
      return
    }
    if (latest < prev - 4) {
      setVisible(true)
    } else if (latest > prev + 4) {
      setVisible(false)
    }
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="sticky-nav"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="hidden md:block fixed top-5 left-4 right-4 md:left-6 md:right-6 z-50"
        >
          <div
            className="relative max-content"
            style={{
              background:
                'linear-gradient(180deg, rgba(224, 206, 176, 0.88) 0%, rgba(201, 185, 163, 0.92) 100%)',
              backdropFilter: 'blur(22px) saturate(160%)',
              WebkitBackdropFilter: 'blur(22px) saturate(160%)',
              border: '1px solid rgba(156, 107, 79, 0.35)',
              boxShadow:
                '0 30px 70px -25px rgba(77, 52, 30, 0.35), 0 8px 24px -8px rgba(77, 52, 30, 0.18), inset 0 1px 0 rgba(255, 253, 248, 0.45)',
            }}
          >
            {/* Top accent strip */}
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(156,107,79,0) 0%, rgba(156,107,79,1) 25%, rgba(156,107,79,1) 75%, rgba(156,107,79,0) 100%)',
              }}
            />

            {/* Corner ticks */}
            <span
              aria-hidden
              className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent/80"
            />
            <span
              aria-hidden
              className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent/80"
            />
            <span
              aria-hidden
              className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent/80"
            />
            <span
              aria-hidden
              className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent/80"
            />

            <div className="relative flex items-center justify-between gap-4 pl-6 pr-3 md:pl-8 md:pr-4 py-4">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                aria-label="Volver al inicio"
                className="flex items-center gap-4 text-ink group"
              >
                <Logo height={64} />
              </a>

              <ul className="hidden md:flex items-center gap-8 text-[13px] text-ink/80 font-medium">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="relative tracking-[0.08em] hover:text-ink transition-colors group"
                    >
                      {l.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={cvPdfUrl}
                download="Melany-Santiesteban-CV.pdf"
                aria-label="Descargar CV en PDF"
                className="group relative inline-flex items-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.2em] font-medium text-bg transition-colors overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(156,107,79,1) 0%, rgba(128,82,57,1) 100%)',
                  boxShadow:
                    '0 14px 30px -12px rgba(156, 107, 79, 0.55), inset 0 1px 0 rgba(245, 241, 236, 0.18)',
                  border: '1px solid rgba(156, 107, 79, 0.8)',
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-bg origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
                <Download
                  size={14}
                  strokeWidth={1.8}
                  className="relative transition-all group-hover:translate-y-0.5 group-hover:text-ink"
                />
                <span className="relative group-hover:text-ink transition-colors">
                  Descargar CV
                </span>
              </a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
