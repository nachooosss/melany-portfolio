import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Maximize2, ImageIcon } from 'lucide-react'
import { cv } from '../data/cv'
import SectionHeading from './SectionHeading'
import Lightbox from './Lightbox'
import SkeletonImage from './SkeletonImage'
import { useSwipe } from '../hooks/useSwipe'
import { EASE_OUT_EXPO } from '../constants/animation'

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

  const isFirstRenderRef = useRef(true)
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return
    }
    const container = stripRef.current
    if (!container) return
    const el = container.querySelector<HTMLButtonElement>(`[data-thumb="${index}"]`)
    if (!el) return
    // Scroll only the strip horizontally — never the page vertically.
    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const offset =
      elRect.left - containerRect.left - containerRect.width / 2 + elRect.width / 2
    container.scrollBy({ left: offset, behavior: 'smooth' })
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

  // Swipe horizontal en mobile
  const swipe = useSwipe({
    threshold: 60,
    onSwipeLeft: next,
    onSwipeRight: prev,
  })

  const active = items[index]
  const total = String(items.length).padStart(2, '0')
  const current = String(index + 1).padStart(2, '0')

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      rotateY: dir * 45,
      x: dir * 80,
      z: -180,
      scale: 0.9,
      filter: 'blur(8px)',
    }),
    center: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      z: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      opacity: 0,
      rotateY: -dir * 45,
      x: -dir * 80,
      z: -140,
      scale: 0.92,
      filter: 'blur(6px)',
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
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
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
          {/* Featured card con capas 3D estáticas (sin tilt en hover) */}
          <div
            className="lg:col-span-8 relative"
            onTouchStart={swipe.onTouchStart}
            onTouchEnd={swipe.onTouchEnd}
          >
            <div className="relative" data-cursor-hover>
              <div className="relative">
                {/* Capa 3 — frame trasero con patrón diagonal (offset top-left) */}
                <div
                  aria-hidden
                  className="absolute border border-accent/45"
                  style={{
                    inset: '-22px 22px 22px -22px',
                    background:
                      'repeating-linear-gradient(45deg, rgba(156,107,79,0.06) 0 2px, transparent 2px 8px)',
                  }}
                />

                {/* Capa 2 — relleno tostado (offset bottom-right) */}
                <div
                  aria-hidden
                  className="absolute border border-line"
                  style={{
                    inset: '18px -18px -18px 18px',
                    background: 'rgba(156, 107, 79, 0.12)',
                    boxShadow: '0 20px 60px -30px rgba(28,25,23,0.35)',
                  }}
                />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.button
                    key={active.src}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT_EXPO,
                      filter: { duration: 0.35 },
                    }}
                    onClick={() => setLightboxOpen(true)}
                    className="group relative block w-full aspect-[4/3] overflow-hidden border border-line bg-surface cursor-zoom-in"
                    aria-label="Abrir imagen en grande"
                  >
                    <SkeletonImage
                      src={active.src}
                      alt={active.alt}
                      eager
                      className="absolute inset-0 w-full h-full"
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

                {/* Corner ticks editoriales (foreground) */}
                <div
                  aria-hidden
                  className="absolute -top-2 -right-2 w-8 h-8 border-t border-r border-accent pointer-events-none"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-2 -left-2 w-8 h-8 border-b border-l border-accent pointer-events-none"
                />
              </div>

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

            {/* Nav prev/next debajo de la imagen */}
            <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Navegación del carrusel">
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                className="group h-11 w-11 border border-line bg-bg/95 flex items-center justify-center hover:border-ink hover:bg-ink hover:text-bg transition-colors"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
              </button>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted whitespace-nowrap min-w-[70px] text-center">
                {current}
                <span className="opacity-50 mx-2">/</span>
                {total}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label="Siguiente"
                className="group h-11 w-11 border border-line bg-bg/95 flex items-center justify-center hover:border-ink hover:bg-ink hover:text-bg transition-colors"
              >
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </nav>
          </div>

          {/* Meta — solo título + descripción */}
          <div className="lg:col-span-4 flex flex-col gap-6 items-center text-center lg:items-start lg:text-left">
            <div className="w-full">
              <div className="flex items-baseline gap-3 mb-4 justify-center lg:justify-start">
                <span className="font-display text-5xl md:text-6xl text-accent leading-none">
                  {current}
                </span>
                <span className="text-muted font-mono text-sm">/ {total}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.src}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className="max-w-sm mx-auto lg:mx-0"
                >
                  <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                    {active.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors link-underline"
            >
              Abrir en grande
            </button>
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
                <SkeletonImage
                  src={item.src}
                  alt=""
                  className="absolute inset-0 w-full h-full"
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
