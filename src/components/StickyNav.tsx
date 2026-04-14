import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Download } from 'lucide-react'
import { cv } from '../data/cv'
import { pdf } from '@react-pdf/renderer'
import { CVDocument } from './PrintableCV'

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
  const [pdfLoading, setPdfLoading] = useState(false)

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

  const downloadPdf = async () => {
    if (pdfLoading) return
    setPdfLoading(true)
    try {
      const blob = await pdf(<CVDocument />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Melany-Santiesteban-CV.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 2000)
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="sticky-nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-4 left-4 right-4 z-50"
        >
          <div
            className="max-content flex items-center justify-between gap-4 px-4 md:px-6 py-3 border border-line"
            style={{
              background: 'rgba(245, 241, 236, 0.82)',
              backdropFilter: 'blur(14px) saturate(140%)',
              WebkitBackdropFilter: 'blur(14px) saturate(140%)',
              boxShadow: '0 10px 40px -20px rgba(28, 25, 23, 0.25)',
            }}
          >
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="font-display text-lg tracking-tight"
            >
              {cv.personal.monogram}.
            </a>

            <ul className="hidden md:flex items-center gap-7 text-sm text-muted">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline hover:text-ink transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={downloadPdf}
              disabled={pdfLoading}
              className="inline-flex items-center gap-2 bg-ink text-bg px-4 py-2 text-xs uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50"
            >
              <Download size={14} strokeWidth={1.6} />
              {pdfLoading ? 'Generando…' : 'CV'}
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
