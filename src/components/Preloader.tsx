import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Logo from './Logo'

const MIN_SHOW_MS = 900
const MAX_SHOW_MS = 2000

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = performance.now()
    let released = false

    // Bloquea scroll del body mientras el preloader está visible.
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const hide = () => {
      if (released) return
      released = true
      const elapsed = performance.now() - start
      const remaining = Math.max(0, MIN_SHOW_MS - elapsed)
      window.setTimeout(() => setVisible(false), remaining)
    }

    const maxTimer = window.setTimeout(hide, MAX_SHOW_MS)

    if (document.readyState === 'complete') {
      hide()
    } else {
      window.addEventListener('load', hide, { once: true })
    }

    return () => {
      window.clearTimeout(maxTimer)
      window.removeEventListener('load', hide)
    }
  }, [])

  // Libera el scroll y fuerza top cuando el preloader desaparece.
  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = ''
      window.scrollTo(0, 0)
      requestAnimationFrame(() => window.scrollTo(0, 0))
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center preloader-bg overflow-hidden"
          aria-hidden
        >
          {/* Subtle drifting gradient halo */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60vw 50vh at 50% 40%, rgba(156,107,79,0.22) 0%, rgba(156,107,79,0) 60%)',
            }}
            animate={{
              backgroundPosition: ['50% 40%', '50% 60%', '50% 40%'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Film grain layer matching the site */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.14,
              mixBlendMode: 'multiply',
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '240px 240px',
            }}
          />

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo height={120} />
            </motion.div>

            <motion.div
              className="h-px bg-accent origin-center"
              initial={{ width: 0 }}
              animate={{ width: '160px' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Bending bar spinner — the "palito doblándose" */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative h-[2px] w-28 bg-line overflow-hidden"
            >
              <motion.span
                className="absolute top-0 left-0 h-full bg-accent"
                animate={{
                  x: ['-40%', '140%'],
                  scaleX: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ width: '50%', transformOrigin: 'center' }}
              />
            </motion.div>

            <motion.p
              className="text-[10px] uppercase tracking-[0.3em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Cargando portafolio
            </motion.p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted">
            Panamá · 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
