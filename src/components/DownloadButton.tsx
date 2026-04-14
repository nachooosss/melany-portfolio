import { useState } from 'react'
import { Download } from 'lucide-react'

type Props = {
  variant?: 'solid' | 'ghost'
  label?: string
}

export default function DownloadButton({ variant = 'solid', label = 'Descargar CV en PDF' }: Props) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    const node = document.getElementById('printable-cv')
    if (!node) return
    setLoading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf()
        .set({
          margin: 15,
          filename: 'Melany-Santiesteban-CV.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        })
        .from(node)
        .save()
    } finally {
      setLoading(false)
    }
  }

  const base =
    'inline-flex items-center gap-2 px-6 py-3 font-sans text-sm tracking-wide transition-colors duration-300 disabled:opacity-50'

  const styles =
    variant === 'solid'
      ? 'bg-ink text-bg hover:bg-accent'
      : 'border border-ink text-ink hover:bg-ink hover:text-bg'

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className={`${base} ${styles}`}
      aria-label="Descargar CV en PDF"
    >
      <Download size={16} strokeWidth={1.5} />
      {loading ? 'Generando…' : label}
    </button>
  )
}
