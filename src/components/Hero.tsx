import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { cv } from '../data/cv'
import DownloadButton from './DownloadButton'

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
}

function AnimatedWord({ text, base = 0 }: { text: string; base?: number }) {
  return (
    <span className="inline-block" aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          custom={base + i}
          variants={letterVariants}
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
  return (
    <header className="section-gutter min-h-screen flex flex-col justify-between pt-10 pb-16">
      <nav className="flex items-center justify-between">
        <span className="font-display text-lg">MS.</span>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <a href="#about" className="hover:text-ink transition-colors">Sobre mí</a>
          <a href="#experience" className="hover:text-ink transition-colors">Experiencia</a>
          <a href="#skills" className="hover:text-ink transition-colors">Habilidades</a>
          <a href="#contact" className="hover:text-ink transition-colors">Contacto</a>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-16 lg:mt-0">
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-number mb-6"
          >
            00 — Portafolio &amp; CV
          </motion.p>

          <h1 className="font-display font-medium leading-[0.95] text-ink"
              style={{ fontSize: 'clamp(2.2rem, 10vw, 5.5rem)' }}>
            <span className="block">
              <AnimatedWord text="Melany" />
            </span>
            <span className="block italic text-muted">
              <AnimatedWord text="Santiesteban" base={6} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-prose"
          >
            <p className="text-lg md:text-xl text-ink">
              {cv.personal.role} · Panamá
            </p>
            <p className="mt-2 text-muted">
              {cv.personal.tagline}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted">
              <MapPin size={14} strokeWidth={1.5} />
              <span>{cv.personal.location}</span>
              <span className="mx-2">·</span>
              <span>{cv.personal.availability}</span>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <DownloadButton />
              <a
                href={cv.personal.portfolio.url}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink text-ink text-sm tracking-wide hover:bg-ink hover:text-bg transition-colors duration-300"
              >
                {cv.personal.portfolio.label}
                <ArrowRight size={16} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 order-first lg:order-last"
        >
          <div className="aspect-square w-full max-w-sm mx-auto bg-line border border-line overflow-hidden">
            <img
              src={cv.personal.photo}
              alt="Melany Santiesteban, diseñadora de interiores"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="mt-16 flex items-center gap-3 text-xs uppercase tracking-widest text-muted"
      >
        <span className="h-px w-12 bg-muted" />
        Scroll
      </motion.div>
    </header>
  )
}
