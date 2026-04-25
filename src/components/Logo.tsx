type Props = {
  className?: string
  height?: number
  alt?: string
  /**
   * 'svg' (default) renderiza el logo MS · INTERIOR DESIGN como SVG
   * inline. Hereda color via currentColor para los trazos y texto;
   * el punto del marco se mantiene en accent.
   * 'text' renderiza solo el monograma "MS." tipográfico como
   * variante mínima para espacios reducidos.
   */
  variant?: 'svg' | 'text'
}

export default function Logo({
  className = '',
  height = 64,
  alt = 'Melany Santiesteban — MS Interior Design',
  variant = 'svg',
}: Props) {
  if (variant === 'text') {
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

  // SVG aspect ratio 600:200 = 3:1
  const width = height * 3

  return (
    <svg
      role="img"
      aria-label={alt}
      width={width}
      height={height}
      viewBox="0 0 600 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`block select-none text-ink ${className}`}
      style={{ color: 'currentColor' }}
    >
      {/* Icon mark */}
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="20" y="40" width="100" height="100" />
        <rect x="28" y="48" width="84" height="84" />
        <line x1="30" y1="80" x2="110" y2="110" />
        <circle cx="70" cy="95" r="3" fill="var(--accent)" stroke="none" />
        <line x1="35" y1="120" x2="105" y2="120" />
        <line x1="35" y1="128" x2="95" y2="128" />
      </g>

      {/* MS wordmark */}
      <text
        x="160"
        y="110"
        fontFamily="'Fraunces', 'Times New Roman', serif"
        fontSize="80"
        fontWeight="500"
        fill="currentColor"
      >
        MS
      </text>

      {/* Divider line */}
      <line
        x1="160"
        y1="125"
        x2="500"
        y2="125"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Subtitle */}
      <text
        x="160"
        y="155"
        fontFamily="'Inter', sans-serif"
        fontSize="18"
        letterSpacing="3"
        fill="currentColor"
      >
        INTERIOR DESIGN
      </text>
    </svg>
  )
}
