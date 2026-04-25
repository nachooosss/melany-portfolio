import type { ReactNode } from 'react'

type Props = {
  /** id del section para anchor links */
  id?: string
  /** Padding vertical. 'normal' = py-24 md:py-32 (default), 'large' = py-24 md:py-40 */
  padding?: 'normal' | 'large'
  /** Renderizar dentro de max-content + section-gutter (default true) */
  contained?: boolean
  /** Border top entre secciones (default true) */
  bordered?: boolean
  /** Atributos extra opcionales para el <section> */
  ariaLabel?: string
  className?: string
  children: ReactNode
}

/**
 * Wrapper reutilizable de sección con paddings + gutters + border consistentes.
 * Reemplaza el patrón repetido de:
 *   <section className="section-gutter py-24 md:py-32 border-t border-line">
 *     <div className="max-content">...
 */
export default function Section({
  id,
  padding = 'normal',
  contained = true,
  bordered = true,
  ariaLabel,
  className = '',
  children,
}: Props) {
  const paddingClass = padding === 'large' ? 'py-24 md:py-40' : 'py-24 md:py-32'
  const borderClass = bordered ? 'border-t border-line' : ''
  const sectionClasses = `section-gutter ${paddingClass} ${borderClass} ${className}`.trim()

  const inner = contained ? <div className="max-content">{children}</div> : children

  return (
    <section id={id} aria-label={ariaLabel} className={sectionClasses}>
      {inner}
    </section>
  )
}
