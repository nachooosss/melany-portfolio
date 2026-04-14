import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { pdf } from '@react-pdf/renderer'
import { CVDocument } from './PrintableCV'

type Props = {
  variant?: 'solid' | 'ghost'
  label?: string
}

export default function DownloadButton({
  variant = 'solid',
  label = 'Descargar CV en PDF',
}: Props) {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleClick = async () => {
    if (loading) return
    setLoading(true)
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
    } catch (err) {
      console.error('Error generando el PDF:', err)
    } finally {
      setLoading(false)
    }
  }

  const className = variant === 'solid' ? 'btn-primary group' : 'btn-outline group'

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!mounted || loading}
      className={className}
      aria-label="Descargar CV en PDF"
    >
      <Download
        size={16}
        strokeWidth={1.5}
        className="transition-transform group-hover:translate-y-0.5"
      />
      {loading ? 'Generando…' : label}
    </button>
  )
}
