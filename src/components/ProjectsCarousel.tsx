import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, Maximize2, ImageIcon } from 'lucide-react'
import { cv } from '../data/cv'
import SectionHeading from './SectionHeading'
import Lightbox from './Lightbox'

export default function ProjectsCarousel() {
  const items = cv.projects.items
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [direction, setDirection] = useState(1)
  const stripRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (next: number) => {
      const clamped = (next + items.length) % items.length
      setDirection(clamped > index ? 1 : -1)
      setIndex(clamped)
    },
    [index, items.length],
  )

  const prev = useCallback(() => go(index - 1), [go, index])
  const next = useCallback(() => go(index + 1), [go, index])

  useEffect(() => {
    const el = stripRef.current?.querySelector<HTMLButtonElement>(
      `[data-thumb="${index}"]`,
    )
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [index])

  useEffect(() => {
    if (lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, lightboxOpen])

  // 3D tilt that reacts to mouse position over the featured card
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sRx = useSpring(rx, { stiffness: 120, damping: 18 })
  const sRy = useSpring(ry, { stiffness: 120, damping: 18 })
  const transform = useMotionTemplate`perspective(1400px) rotateX(${sRx}deg) rotateY(${sRy}deg)`

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rx.set(-py * 10)
    ry.set(px * 14)
  }
  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  // Swipe handlers for mobile
  const touchStartX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 60) {
      if (dx < 0) next()
      else prev()
    }
    touchStartX.current = null
  }

  const active = items[index]
  const total = String(items.length).padStart(2, '0')
  const current = String(index + 1).padStart(2, '0')

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 0.96,
      x: dir * 40,
    }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.98,
      x: -dir * 40,
    }),
  }

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 border-t border-line overflow-hidden"
    >
      {/* Ambient background: huge, blurred version of active image */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${active.src}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${active.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(90px) saturate(1.3)',
              transform: 'scale(1.2)',
            }}
          />
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(245,241,236,0.85) 0%, rgba(245,241,236,0.6) 50%, rgba(245,241,236,0.9) 100%)',
          }}
        />
      </div>

      <div className="section-gutter max-content relative">
        <SectionHeading
          number="02"
          eyebrow="Proyectos"
          icon={ImageIcon}
          title={
            <>
              Renders y <span className="italic text-muted">visualización 3D</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Featured 3D tilt card */}
          <div
            className="lg:col-span-8 relative"
            style={{ perspective: '1400px' }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="relative"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              data-cursor-hover
            >
              <motion.div
                style={{
                  transform,
                  transformStyle: 'preserve-3d',
                }}
                className="relative"
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.button
                    key={active.src}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setLightboxOpen(true)}
                    className="group relative block w-full aspect-[4/3] overflow-hidden border border-line bg-surface cursor-zoom-in"
                    aria-label="Abrir imagen en grande"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img
                      src={active.src}
                      alt={active.alt}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(28,25,23,0) 40%, rgba(28,25,23,0.55) 100%)',
                      }}
                    />
                    <motion.span
                      className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-bg/90 backdrop-blur text-ink text-[10px] uppercase tracking-[0.2em]"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {current} / {total}
                    </motion.span>
                    <span className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-bg/90 backdrop-blur text-ink text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Maximize2 size={12} strokeWidth={1.6} />
                      Ampliar
                    </span>
                  </motion.button>
                </AnimatePresence>
              </motion.div>

              {/* Floating shadow layer for depth */}
              <div
                aria-hidden
                className="absolute -inset-x-8 -bottom-6 h-12 rounded-[50%] -z-10"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(28,25,23,0.25), transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />
            </div>
          </div>

          {/* Meta + controls */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-5xl md:text-6xl text-accent leading-none">
                  {current}
                </span>
                <span className="text-muted font-mono text-sm">/ {total}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed max-w-sm">
                {cv.projects.caption}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                className="group h-12 w-12 border border-line flex items-center justify-center hover:border-ink hover:bg-ink hover:text-bg transition-colors"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Siguiente"
                className="group h-12 w-12 border border-line flex items-center justify-center hover:border-ink hover:bg-ink hover:text-bg transition-colors"
              >
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="ml-3 text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors link-underline"
              >
                Abrir en grande
              </button>
            </div>

            <div className="hidden md:block">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">
                Navegación
              </p>
              <p className="text-xs text-muted">
                Usa las flechas ← → del teclado · Arrastra en mobile · Click en la imagen
                para ampliar
              </p>
            </div>
          </div>
        </div>

        {/* Filmstrip */}
        <div className="mt-16">
          <div
            ref={stripRef}
            className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'thin' }}
          >
            {items.map((item, i) => (
              <motion.button
                key={item.src}
                data-thumb={i}
                type="button"
                onClick={() => go(i)}
                whileHover={{ y: -4 }}
                className="relative flex-shrink-0 snap-center overflow-hidden border transition-all duration-500"
                style={{
                  width: i === index ? '140px' : '96px',
                  height: i === index ? '100px' : '72px',
                  borderColor:
                    i === index ? 'var(--accent)' : 'var(--line)',
                  opacity: i === index ? 1 : 0.55,
                }}
                aria-label={`Ver render ${i + 1}`}
                aria-current={i === index}
              >
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {i === index && (
                  <motion.span
                    layoutId="thumb-indicator"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-accent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        items={items}
        index={index}
        onClose={() => setLightboxOpen(false)}
        onPrev={prev}
        onNext={next}
      />
    </section>
  )
}
