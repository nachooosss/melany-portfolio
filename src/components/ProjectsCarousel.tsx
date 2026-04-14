import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cv } from '../data/cv'
import SectionHeading from './SectionHeading'

const ITEM_WIDTH_DESKTOP = 420
const ITEM_WIDTH_MOBILE = 280
const GAP = 24

export default function ProjectsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  const x = useMotionValue(0)
  const [index, setIndex] = useState(0)
  const [constraints, setConstraints] = useState({ left: 0, right: 0 })
  const [itemWidth, setItemWidth] = useState(ITEM_WIDTH_DESKTOP)

  const items = cv.projects.items

  useEffect(() => {
    const compute = () => {
      if (!viewportRef.current || !trackRef.current) return
      const vw = viewportRef.current.offsetWidth
      const tw = trackRef.current.scrollWidth
      setConstraints({ left: Math.min(0, vw - tw), right: 0 })
      setItemWidth(window.innerWidth < 768 ? ITEM_WIDTH_MOBILE : ITEM_WIDTH_DESKTOP)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      const step = itemWidth + GAP
      const i = Math.round(Math.abs(latest) / step)
      setIndex(Math.max(0, Math.min(items.length - 1, i)))
    })
    return () => unsubscribe()
  }, [x, itemWidth, items.length])

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, i))
    const target = -clamped * (itemWidth + GAP)
    animate(x, Math.max(constraints.left, target), {
      type: 'spring',
      stiffness: 200,
      damping: 28,
    })
  }

  const displayIndex = String(index + 1).padStart(2, '0')
  const totalIndex = String(items.length).padStart(2, '0')

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 border-t border-line overflow-hidden"
    >
      <div className="section-gutter max-content">
        <SectionHeading
          number="02"
          eyebrow="Proyectos"
          title={
            <>
              {cv.projects.heading.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="italic text-muted">
                {cv.projects.heading.split(' ').slice(-1)[0]}
              </span>
            </>
          }
        />
      </div>

      <div
        ref={sectionRef}
        className="relative"
        onMouseEnter={() => document.body.setAttribute('data-cursor', 'drag')}
        onMouseLeave={() => document.body.removeAttribute('data-cursor')}
      >
        <div
          className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center select-none"
          aria-hidden
        >
          <motion.span
            className="ghost-number"
            style={{ fontSize: 'clamp(12rem, 30vw, 28rem)', opacity: 0.25 }}
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.25, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {displayIndex}
          </motion.span>
        </div>

        <div ref={viewportRef} className="carousel-viewport">
          <motion.div
            ref={trackRef}
            className="carousel-track"
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.08}
            dragMomentum
            style={{ x }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((item, i) => {
              const offsetY = Math.sin(i * 0.9) * 24
              const height = 440 + Math.cos(i * 0.7) * 60
              const isActive = i === index
              return (
                <motion.figure
                  key={item.src}
                  className="carousel-item"
                  style={{
                    width: `${itemWidth}px`,
                    height: `${height}px`,
                    marginTop: `${offsetY + 40}px`,
                  }}
                  animate={{
                    scale: isActive ? 1.02 : 0.96,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={item.src} alt={item.alt} draggable={false} />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/70 to-transparent text-bg text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono">
                      {String(i + 1).padStart(2, '0')} / {totalIndex}
                    </span>
                  </figcaption>
                </motion.figure>
              )
            })}
          </motion.div>
        </div>

        <div className="section-gutter max-content mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-sm text-muted max-w-md leading-relaxed">
              {cv.projects.caption}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs tracking-widest uppercase text-muted">
              <span className="font-mono text-accent">{displayIndex}</span>
              <span className="h-px w-12 bg-line" />
              <span className="font-mono">{totalIndex}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Anterior"
              className="h-11 w-11 border border-line flex items-center justify-center hover:border-ink transition-colors disabled:opacity-40"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === items.length - 1}
              aria-label="Siguiente"
              className="h-11 w-11 border border-line flex items-center justify-center hover:border-ink transition-colors disabled:opacity-40"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
            <div className="hidden md:flex ml-4 gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir al render ${i + 1}`}
                  className={`h-1 transition-all ${
                    i === index ? 'w-8 bg-accent' : 'w-4 bg-line hover:bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
