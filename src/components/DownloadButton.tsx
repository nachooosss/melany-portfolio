import { m as motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'

// PDF servido directamente desde /public para URL estable + prefetch
const cvPdfUrl = '/docs/Melany-Santiesteban-CV.pdf'

type Props = {
  variant?: 'solid' | 'ghost'
  label?: string
  className?: string
  /** Activar efecto magnético (sólo desktop con pointer fino) */
  magnetic?: boolean
}

export default function DownloadButton({
  variant = 'solid',
  label = 'Descargar CV en PDF',
  className = '',
  magnetic = true,
}: Props) {
  const baseClass = variant === 'solid' ? 'btn-primary group' : 'btn-outline group'
  const { ref, x, y } = useMagnetic<HTMLAnchorElement>({ strength: 0.35, radius: 110 })

  const inner = (
    <>
      <Download
        size={16}
        strokeWidth={1.5}
        className="transition-transform group-hover:translate-y-0.5"
      />
      {label}
    </>
  )

  if (!magnetic) {
    return (
      <a
        href={cvPdfUrl}
        download="Melany-Santiesteban-CV.pdf"
        className={`${baseClass} ${className}`.trim()}
        aria-label="Descargar CV en PDF"
      >
        {inner}
      </a>
    )
  }

  return (
    <motion.a
      ref={ref}
      href={cvPdfUrl}
      download="Melany-Santiesteban-CV.pdf"
      style={{ x, y }}
      className={`${baseClass} ${className}`.trim()}
      aria-label="Descargar CV en PDF"
    >
      {inner}
    </motion.a>
  )
}
