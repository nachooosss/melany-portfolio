import {
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Mail,
  MessageCircle,
  Linkedin,
  Instagram,
  ChevronUp,
  Download,
  Plus,
  UserRound,
  ImageIcon,
  Briefcase,
  Send,
} from 'lucide-react'
import { createPortal } from 'react-dom'
import { cv } from '../data/cv'
import cvPdfUrl from '../docs/Melany Santiesteban 2026-ES.pdf?url'

type Item = {
  key: string
  label: string
  href: string
  Icon: typeof Mail
  primary?: boolean
  download?: string
  external?: boolean
}

// Desktop: stack vertical con métodos de contacto directos
const desktopItems: Item[] = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: cv.personal.whatsapp,
    Icon: MessageCircle,
    primary: true,
    external: true,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: cv.personal.instagram.url,
    Icon: Instagram,
    external: true,
  },
  {
    key: 'email',
    label: 'Email',
    href: `mailto:${cv.personal.email}`,
    Icon: Mail,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: cv.personal.linkedin.url,
    Icon: Linkedin,
    external: true,
  },
  {
    key: 'cv',
    label: 'Descargar CV',
    href: cvPdfUrl,
    Icon: Download,
    download: 'Melany-Santiesteban-CV.pdf',
  },
]

// Mobile radial: navegación rápida entre secciones + WhatsApp + CV.
// Para otros canales de contacto, se va a la sección Contacto.
const mobileItems: Item[] = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: cv.personal.whatsapp,
    Icon: MessageCircle,
    primary: true,
    external: true,
  },
  {
    key: 'about',
    label: 'Sobre mí',
    href: '#about',
    Icon: UserRound,
  },
  {
    key: 'projects',
    label: 'Proyectos',
    href: '#projects',
    Icon: ImageIcon,
  },
  {
    key: 'experience',
    label: 'Experiencia',
    href: '#experience',
    Icon: Briefcase,
  },
  {
    key: 'contact',
    label: 'Contacto',
    href: '#contact',
    Icon: Send,
  },
  {
    key: 'cv',
    label: 'Descargar CV',
    href: cvPdfUrl,
    Icon: Download,
    download: 'Melany-Santiesteban-CV.pdf',
  },
]

const shadow =
  '0 20px 45px -15px rgba(28, 25, 23, 0.4), 0 6px 16px -6px rgba(28, 25, 23, 0.18)'

export default function FloatingContacts() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const [radialOpen, setRadialOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 600)
  })

  // Bloquear scroll del body cuando el radial está abierto
  useEffect(() => {
    if (!radialOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [radialOpen])

  // Cerrar con ESC
  useEffect(() => {
    if (!radialOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRadialOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [radialOpen])

  if (!visible) return null

  const N = mobileItems.length

  const radialMenu =
    typeof document !== 'undefined'
      ? createPortal(
          <div
            onClick={() => setRadialOpen(false)}
            className={`md:hidden fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-400 ${
              radialOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            style={{
              background: 'rgba(28, 25, 23, 0.82)',
              backdropFilter: radialOpen ? 'blur(14px)' : 'none',
              WebkitBackdropFilter: radialOpen ? 'blur(14px)' : 'none',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`menu-radial ${radialOpen ? 'active' : ''}`}
              style={{ ['--n' as string]: N } as React.CSSProperties}
            >
              <ul>
                {mobileItems.map((item, i) => {
                  const Icon = item.Icon
                  return (
                    <li
                      key={item.key}
                      className={item.primary ? 'primary' : ''}
                      style={{ ['--i' as string]: i } as React.CSSProperties}
                    >
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noreferrer' : undefined}
                        download={item.download}
                        aria-label={item.label}
                        onClick={() => setRadialOpen(false)}
                      >
                        <Icon size={22} strokeWidth={1.8} />
                        <span className="menu-radial-label">{item.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>

              <button
                type="button"
                onClick={() => setRadialOpen(false)}
                aria-label="Cerrar menú"
                className="menu-toggle"
              >
                <Plus size={28} strokeWidth={2} />
              </button>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      {/* DESKTOP — pila vertical (md+) */}
      <motion.aside
        key="floating-contacts-desktop"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex fixed right-6 bottom-10 z-40 flex-col items-end gap-3"
      >
        <ul className="flex flex-col gap-3">
          {desktopItems.map(({ key, label, href, Icon, primary, download, external }, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.07 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                download={download}
                aria-label={label}
                className={`group relative flex items-center justify-center h-16 w-16 backdrop-blur-md transition-colors ${
                  primary
                    ? 'bg-accent text-bg hover:bg-ink'
                    : 'bg-bg/95 text-ink hover:bg-ink hover:text-bg'
                }`}
                style={{
                  border: primary
                    ? '1px solid rgba(156, 107, 79, 0.9)'
                    : '1px solid rgba(201, 185, 163, 0.9)',
                  boxShadow: shadow,
                }}
              >
                <Icon size={24} strokeWidth={1.8} />
                {primary && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 border border-accent/60 pointer-events-none"
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.8, 0, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                )}
                <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink text-bg text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver al inicio"
          className="group flex items-center justify-center h-16 w-16 bg-bg/95 backdrop-blur-md hover:bg-accent transition-colors"
          style={{
            border: '1px solid rgba(201, 185, 163, 0.9)',
            boxShadow: shadow,
          }}
        >
          <ChevronUp
            size={24}
            strokeWidth={1.8}
            className="text-ink group-hover:text-bg transition-all group-hover:-translate-y-0.5"
          />
        </button>
      </motion.aside>

      {/* MOBILE — FAB en bottom-right que dispara radial menu centrado */}
      <motion.div
        key="floating-fab-mobile"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed right-5 bottom-6 z-40"
      >
        <motion.button
          type="button"
          onClick={() => setRadialOpen(true)}
          aria-label="Abrir menú de contacto"
          aria-expanded={radialOpen}
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center justify-center h-14 w-14 rounded-full bg-accent text-bg"
          style={{
            border: '1px solid rgba(156, 107, 79, 0.9)',
            boxShadow:
              '0 18px 40px -12px rgba(156, 107, 79, 0.6), 0 6px 14px -4px rgba(28, 25, 23, 0.25)',
          }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-accent pointer-events-none"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.7, 0, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <Plus size={26} strokeWidth={2} />
        </motion.button>
      </motion.div>

      {radialMenu}
    </>
  )
}
