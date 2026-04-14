import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { cv } from '../data/cv'
import DownloadButton from './DownloadButton'

const charVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.2 + i * 0.03,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function SplitName({ text, base = 0 }: { text: string; base?: number }) {
  return (
    <span className="inline-block" aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          custom={base + i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <header
      ref={sectionRef}
      className="relative section-gutter min-h-screen flex flex-col justify-between pt-8 pb-16 overflow-hidden"
    >
      <span
        className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 vertical-rl"
        aria-hidden
      >
        Panamá · 2026 · Interior Design
      </span>

      <nav className="relative z-10 max-content w-full flex items-center justify-between">
        <span className="font-display text-lg tracking-tight">
          {cv.personal.monogram}.
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <a href="#about" className="link-underline hover:text-ink transition-colors">
            Sobre mí
          </a>
          <a href="#projects" className="link-underline hover:text-ink transition-colors">
            Proyectos
          </a>
          <a href="#experience" className="link-underline hover:text-ink transition-colors">
            Experiencia
          </a>
          <a href="#contact" className="link-underline hover:text-ink transition-colors">
            Contacto
          </a>
        </div>
      </nav>

      <div className="relative z-10 max-content w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-10 lg:mt-0">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-number mb-6"
          >
            00 — Portafolio &amp; CV
          </motion.p>

          <h1
            className="font-display font-medium leading-[0.9] text-ink"
            style={{ fontSize: 'clamp(2.4rem, 9vw, 6.5rem)' }}
          >
            <span className="block">
              <SplitName text="Melany" />
            </span>
            <span className="block italic text-muted">
              <SplitName text="Santiesteban" base={7} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-prose"
          >
            <p className="text-base md:text-lg text-ink">{cv.personal.role}</p>
            <p className="mt-2 text-muted md:text-lg leading-relaxed">
              {cv.personal.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 inline-flex items-center gap-3 border border-line bg-surface/60 px-4 py-2 text-xs text-muted"
          >
            <span
              className="h-2 w-2 rounded-full bg-accent animate-pulse"
              aria-hidden
            />
            {cv.personal.availabilityPill}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 flex items-center gap-2 text-sm text-muted"
          >
            <MapPin size={14} strokeWidth={1.5} />
            <span>{cv.personal.location}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <DownloadButton />
            <a href="#projects" className="btn-outline group">
              Ver proyectos
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: photoY }}
            className="relative w-[200px] sm:w-[240px] lg:w-[360px] max-w-full"
          >
            <div
              className="relative border border-line bg-line overflow-hidden"
              style={{ aspectRatio: '2 / 3' }}
            >
              <img
                src={cv.personal.photo}
                alt="Melany Santiesteban, diseñadora de interiores en Panamá"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget
                  el.style.display = 'none'
                  const parent = el.parentElement
                  if (parent) {
                    parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-family:Fraunces,serif;color:${
                      getComputedStyle(document.documentElement).getPropertyValue('--muted') ||
                      '#6B5F55'
                    };font-size:14px;padding:1rem;text-align:center">Añade public/perfil.jpg</div>`
                  }
                }}
              />
            </div>
            <span className="hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2 vertical-rl">
              Retrato · 2026
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="relative z-10 max-content w-full mt-12 flex items-center gap-3 text-xs uppercase tracking-widest text-muted"
      >
        <span className="h-px w-12 bg-muted" />
        Scroll para explorar
      </motion.div>
    </header>
  )
}
