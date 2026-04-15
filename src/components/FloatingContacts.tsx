import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Mail, MessageCircle, Linkedin, ChevronUp } from 'lucide-react'
import { cv } from '../data/cv'

const items = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: cv.personal.whatsapp,
    Icon: MessageCircle,
    primary: true,
  },
  {
    key: 'email',
    label: 'Email',
    href: `mailto:${cv.personal.email}`,
    Icon: Mail,
    primary: false,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: cv.personal.linkedin.url,
    Icon: Linkedin,
    primary: false,
  },
]

const shadow =
  '0 20px 45px -15px rgba(28, 25, 23, 0.4), 0 6px 16px -6px rgba(28, 25, 23, 0.18)'

export default function FloatingContacts() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 600)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="floating-contacts"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 md:right-6 bottom-6 md:bottom-10 z-40 flex flex-col items-end gap-3"
        >
          <ul className="flex flex-col gap-3">
            {items.map(({ key, label, href, Icon, primary }, i) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
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
                      className="absolute inset-0 rounded-none border border-accent/60 pointer-events-none"
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
      )}
    </AnimatePresence>
  )
}
