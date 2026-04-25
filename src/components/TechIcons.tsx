/**
 * Iconos minimalistas editoriales inspirados en cada software,
 * stroke-based para coherencia con el resto del sitio. No reproducen
 * logos oficiales. Heredan color via currentColor.
 */

type IconProps = {
  size?: number
  strokeWidth?: number
  className?: string
}

const baseProps = (size: number, className: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 100 100',
  className,
  'aria-hidden': true,
  xmlns: 'http://www.w3.org/2000/svg',
})

// AutoCAD — letra A geométrica con barra
export function AutoCADIcon({ size = 28, strokeWidth = 5, className = '' }: IconProps) {
  return (
    <svg
      {...baseProps(size, className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <polygon points="50,12 88,88 70,88 60,68 40,68 30,88 12,88" />
      <line x1="42" y1="58" x2="58" y2="58" />
    </svg>
  )
}

// SketchUp — cubo isométrico
export function SketchUpIcon({ size = 28, strokeWidth = 5, className = '' }: IconProps) {
  return (
    <svg
      {...baseProps(size, className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <polygon points="50,12 88,32 50,52 12,32" />
      <polyline points="12,32 12,72 50,92 50,52" />
      <polyline points="50,92 88,72 88,32" />
    </svg>
  )
}

// D5 Render — esfera con highlight de luz
export function D5Icon({ size = 28, strokeWidth = 5, className = '' }: IconProps) {
  return (
    <svg
      {...baseProps(size, className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      <circle cx="50" cy="50" r="34" />
      <circle cx="64" cy="36" r="6" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Twinmotion — lente cinemática
export function TwinmotionIcon({ size = 28, strokeWidth = 5, className = '' }: IconProps) {
  return (
    <svg
      {...baseProps(size, className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M14 50 Q50 14 86 50 Q50 86 14 50 Z" />
      <circle cx="50" cy="50" r="9" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Photoshop — cuadro con "Ps"
export function PhotoshopIcon({ size = 28, strokeWidth = 5, className = '' }: IconProps) {
  return (
    <svg
      {...baseProps(size, className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    >
      <rect x="10" y="10" width="80" height="80" rx="6" />
      <text
        x="50"
        y="68"
        fontSize="46"
        fontWeight="500"
        fontStyle="italic"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        Ps
      </text>
    </svg>
  )
}
