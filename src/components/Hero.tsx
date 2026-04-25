import {
  m as motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cv } from '../data/cv'
import DownloadButton from './DownloadButton'
import Logo from './Logo'
import SkeletonImage from './SkeletonImage'
import { EASE_OUT_EXPO, EASE_IN_OUT_SINE } from '../constants/animation'

const charVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.2 + i * 0.03,
      duration: 0.8,
      ease: EASE_OUT_EXPO,
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
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  // Cursor spotlight — sigue al mouse en desktop (sin React state, máximo perf)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = sectionRef.current
    const spotlight = spotlightRef.current
    if (!section || !spotlight) return

    let raf = 0
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        spotlight.style.setProperty('--mx', `${x}%`)
        spotlight.style.setProperty('--my', `${y}%`)
      })
    }
    const handleEnter = () => spotlight.classList.add('active')
    const handleLeave = () => spotlight.classList.remove('active')

    section.addEventListener('mousemove', handleMove)
    section.addEventListener('mouseenter', handleEnter)
    section.addEventListener('mouseleave', handleLeave)
    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', handleMove)
      section.removeEventListener('mouseenter', handleEnter)
      section.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.82, 1], [1, 1, 0])
  const contentBlur = useTransform(scrollYProgress, [0, 0.8, 1], ['0px', '0px', '4px'])
  const contentFilter = useMotionTemplate`blur(${contentBlur})`

  return (
    <header
      ref={sectionRef}
      className="relative section-gutter min-h-screen flex flex-col justify-between pt-8 pb-16 overflow-hidden"
    >
      {/* Cursor spotlight (desktop only, controlado via CSS vars) */}
      <div ref={spotlightRef} className="hero-spotlight" aria-hidden />

      <span
        className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 vertical-rl"
        aria-hidden
      >
        Panamá · 2026 · Interior Design
      </span>

      <nav className="relative z-10 max-content w-full flex items-center justify-center md:justify-between">
        <div className="flex items-center gap-5">
          <Logo height={96} />
        </div>
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
          <a href="#skills" className="link-underline hover:text-ink transition-colors">
            Habilidades
          </a>
          <a href="#contact" className="link-underline hover:text-ink transition-colors">
            Contacto
          </a>
        </div>
      </nav>

      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          filter: isMobile ? 'none' : contentFilter,
        }}
        className="relative z-10 max-content w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-10 lg:mt-0"
      >
        <div className="lg:col-span-7 order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-number mb-6 text-center lg:text-left"
          >
            00 — Portafolio &amp; CV
          </motion.p>

          <h1
            className="font-display font-medium leading-[0.88] text-ink"
            style={{ fontSize: 'clamp(2.75rem, 10.5vw, 7.5rem)' }}
          >
            <span className="block">
              <SplitName text="Melany" />
            </span>
            <span className="block italic text-muted">
              <SplitName text="Santiesteban" base={7} />
            </span>
          </h1>

          <div className="mt-10 max-w-prose">
            <p
              className="text-lg md:text-xl text-ink"
              aria-label={cv.personal.role}
            >
              {cv.personal.role.split('').map((ch, i) => (
                <motion.span
                  key={`role-${i}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.0 + i * 0.015,
                    duration: 0.35,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="inline-block"
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </p>
            <p
              className="mt-3 text-muted text-lg md:text-xl leading-relaxed"
              aria-label={cv.personal.tagline}
            >
              {cv.personal.tagline.split('').map((ch, i) => (
                <motion.span
                  key={`tag-${i}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.6 + i * 0.011,
                    duration: 0.3,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="inline-block"
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7, ease: EASE_OUT_EXPO }}
            className="mt-7 inline-flex items-center gap-3 border border-line bg-surface/70 px-5 py-2.5 text-sm text-muted"
            style={{
              boxShadow: '0 8px 24px -12px rgba(28,25,23,0.18)',
            }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" aria-hidden />
            {cv.personal.availabilityPill}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: EASE_OUT_EXPO }}
            className="mt-6 flex items-center gap-2 text-base text-muted"
          >
            <MapPin size={14} strokeWidth={1.5} />
            <span>{cv.personal.location}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.45, duration: 0.7, ease: EASE_OUT_EXPO }}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-start"
          >
            <DownloadButton className="justify-center sm:justify-start" />
            <a
              href="#projects"
              className="btn-outline group justify-center sm:justify-start"
            >
              Ver proyectos
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: EASE_OUT_EXPO }}
            style={{ y: photoY }}
            className="relative w-[220px] sm:w-[260px] lg:w-[380px] max-w-full"
          >
            <div className="relative">
              {/* Layer 3 — back frame con patrón diagonal (offset top-left) */}
              <div
                aria-hidden
                className="absolute border border-accent/45"
                style={{
                  inset: '-22px 22px 22px -22px',
                  background:
                    'repeating-linear-gradient(45deg, rgba(156,107,79,0.06) 0 2px, transparent 2px 8px)',
                }}
              />

              {/* Layer 2 — middle tint (offset bottom-right) */}
              <div
                aria-hidden
                className="absolute border border-line"
                style={{
                  inset: '18px -18px -18px 18px',
                  background: 'rgba(156, 107, 79, 0.12)',
                  boxShadow: '0 20px 60px -30px rgba(28,25,23,0.35)',
                }}
              />

              {/* Layer 1 — la foto */}
              <SkeletonImage
                src={cv.personal.photo}
                alt="Melany Santiesteban, diseñadora de interiores en Panamá"
                eager
                fetchPriority="high"
                className="relative border border-line bg-line"
                style={{
                  aspectRatio: '2 / 3',
                  boxShadow: '0 30px 80px -40px rgba(28,25,23,0.4)',
                }}
              />

              {/* Corner ticks editoriales */}
              <div
                aria-hidden
                className="absolute -top-2 -right-2 w-8 h-8 border-t border-r border-accent"
              />
              <div
                aria-hidden
                className="absolute -bottom-2 -left-2 w-8 h-8 border-b border-l border-accent"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-label="Scroll para explorar el portafolio"
        className="group relative z-10 max-content w-full mt-12 flex items-center gap-4 text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors"
      >
        <span className="h-px w-12 bg-muted group-hover:bg-accent transition-colors" />
        <span>Scroll para explorar</span>
        <motion.span
          className="inline-flex items-center justify-center h-9 w-9 border border-line group-hover:border-accent group-hover:text-accent transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: EASE_IN_OUT_SINE,
          }}
        >
          <ChevronDown size={16} strokeWidth={1.6} />
        </motion.span>
      </motion.a>
    </header>
  )
}
