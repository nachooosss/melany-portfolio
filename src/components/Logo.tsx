type Props = {
  className?: string
  height?: number
  alt?: string
  /**
   * 'text' (default) renderiza un monograma "MS." tipográfico en
   * Fraunces italic con el punto en terracota. Siempre limpio,
   * no depende de ningún archivo raster.
   *
   * 'image' usa /logo.jpg con un filtro SVG de silueta. Úsalo solo
   * si el JPG es un logo limpio sin marcos ni bordes estructurales;
   * de lo contrario el filtro no puede removerlos.
   */
  variant?: 'image' | 'text'
}

export default function Logo({
  className = '',
  height = 64,
  alt = 'Melany Santiesteban — MS Interior Design',
  variant = 'text',
}: Props) {
  if (variant === 'image') {
    return (
      <img
        src="/logo.jpg"
        alt={alt}
        className={`block select-none pointer-events-none ${className}`}
        style={{
          height: `${height}px`,
          width: 'auto',
          filter: 'contrast(1.08) brightness(1.06) url(#logo-keywhite)',
        }}
        draggable={false}
      />
    )
  }

  return (
    <span
      aria-label={alt}
      className={`inline-flex items-baseline select-none text-ink ${className}`}
      style={{ lineHeight: 0.85 }}
    >
      <span
        className="font-display italic font-medium"
        style={{ fontSize: `${height * 0.9}px`, letterSpacing: '-0.04em' }}
      >
        M
      </span>
      <span
        className="font-display italic font-medium"
        style={{ fontSize: `${height * 0.9}px`, letterSpacing: '-0.04em' }}
      >
        s
      </span>
      <span
        className="font-display font-medium text-accent"
        style={{ fontSize: `${height * 0.9}px`, marginLeft: '-0.04em' }}
      >
        .
      </span>
    </span>
  )
}
