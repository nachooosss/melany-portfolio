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
  },
]

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
            {items.map(({ key, label, href, Icon }, i) => (
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
                  className="group relative flex items-center justify-center h-12 w-12 border border-line bg-bg/90 backdrop-blur hover:bg-ink hover:border-ink transition-colors"
                >
                  <Icon
                    size={18}
                    strokeWidth={1.6}
                    className="text-ink group-hover:text-bg transition-colors"
                  />
                  <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink text-bg text-[10px] uppercase tracking-widest px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
            className="group flex items-center justify-center h-12 w-12 border border-line bg-bg/90 backdrop-blur hover:bg-accent hover:border-accent transition-colors"
          >
            <ChevronUp
              size={18}
              strokeWidth={1.6}
              className="text-ink group-hover:text-bg transition-colors"
            />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
