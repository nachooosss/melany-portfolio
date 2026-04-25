import { Download } from 'lucide-react'

// PDF servido directamente desde /public para URL estable + prefetch
const cvPdfUrl = '/docs/Melany-Santiesteban-CV.pdf'

type Props = {
  variant?: 'solid' | 'ghost'
  label?: string
  className?: string
}

export default function DownloadButton({
  variant = 'solid',
  label = 'Descargar CV en PDF',
  className = '',
}: Props) {
  const baseClass = variant === 'solid' ? 'btn-primary group' : 'btn-outline group'

  return (
    <a
      href={cvPdfUrl}
      download="Melany-Santiesteban-CV.pdf"
      className={`${baseClass} ${className}`.trim()}
      aria-label="Descargar CV en PDF"
    >
      <Download
        size={16}
        strokeWidth={1.5}
        className="transition-transform group-hover:translate-y-0.5"
      />
      {label}
    </a>
  )
}
