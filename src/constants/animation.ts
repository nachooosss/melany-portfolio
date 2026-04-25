/**
 * Curvas de animación reutilizables. Centralizar acá evita inconsistencias
 * y permite cambiar el "feel" global del sitio editando un solo lugar.
 *
 * `as const` hace que TypeScript infiera el tipo tuple [number, number, number, number]
 * que es lo que framer-motion espera para `ease`.
 */

/** Exponential ease-out — arranca rápido, se asienta suave. Default del sitio. */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

/** Ease-in fuerte — útil para retracciones y exits. */
export const EASE_IN_HARD = [0.55, 0, 0.55, 0.2] as const

/** Sinoidal — suave en ambos extremos, ideal para loops. */
export const EASE_IN_OUT_SINE = [0.45, 0, 0.55, 1] as const

/** Spring brusco para enter/exit dramáticos. */
export const EASE_OVERSHOOT = [0.76, 0, 0.24, 1] as const

/**
 * Configuraciones spring reusables para framer-motion `transition.type: 'spring'`.
 */
export const SPRING_SOFT = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 22,
}

export const SPRING_SNAPPY = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 22,
}
