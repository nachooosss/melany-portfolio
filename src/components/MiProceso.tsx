import { useState, lazy, Suspense } from 'react'
import { m as motion } from 'framer-motion'
import { Compass, Palette, Box, Sparkles, Maximize2, type LucideIcon } from 'lucide-react'
import Section from './Section'
import SectionHeading from './SectionHeading'
import SkeletonImage from './SkeletonImage'
import { revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import { EASE_OUT_EXPO } from '../constants/animation'
import type { LightboxItem } from './Lightbox'
import { TECH_ICONS } from './TechIcons'

const Lightbox = lazy(() => import('./Lightbox'))

type Step = {
  number: string
  title: string
  description: string
  tools: string[]
  deliverable: string
  image: string
  imageAlt: string
  icon: LucideIcon
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Análisis & planimetría',
    description:
      'Levanto el espacio existente, estudio circulación, entrada de luz natural y condicionantes técnicas. La planta acotada es la base de toda decisión posterior — sin ese cimiento ningún render se sostiene.',
    tools: ['AutoCAD', 'Levantamiento físico', 'Brief con cliente'],
    deliverable: 'Plano técnico acotado',
    image: '/mi-proceso/3-min.webp',
    imageAlt:
      'Planos técnicos del proyecto Serene Haven — planta arquitectónica acotada y planta diseñada con propuesta de mobiliario',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Concepto & moodboard',
    description:
      'Construyo la narrativa: paleta cromática, materiales, mobiliario de inspiración y atmósfera. El espacio cuenta una historia antes de ser modelado — los tonos, las texturas y las formas dialogan con el contexto.',
    tools: ['Photoshop', 'Pinterest', 'Muestrarios físicos'],
    deliverable: 'Lámina conceptual',
    image: '/mi-proceso/1-min.webp',
    imageAlt:
      'Moodboard Serene Haven con paleta de color, materiales y mobiliario de referencia',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Modelado 3D',
    description:
      'Traduzco el concepto a geometría: muros, mobiliario, vistas isométricas y cortes técnicos. La maqueta digital permite verificar proporciones, resolver detalles constructivos y anticipar problemas antes de invertir en render.',
    tools: ['SketchUp', 'AutoCAD', 'Layout'],
    deliverable: 'Modelo + cortes técnicos',
    image: '/mi-proceso/isometrico-min.webp',
    imageAlt:
      'Modelo isométrico 3D del proyecto en SketchUp mostrando distribución y mobiliario',
    icon: Box,
  },
  {
    number: '04',
    title: 'Visualización',
    description:
      'Aplico materiales reales, iluminación física y postproducción para llegar a un render fotorrealista. El entregable final es una lámina presentable que el cliente aprueba — y el equipo de obra ejecuta — sin ambigüedad.',
    tools: ['D5 Render', 'Twinmotion', 'Photoshop'],
    deliverable: 'Lámina presentable',
    image: '/mi-proceso/2-min.webp',
    imageAlt:
      'Lámina final con vistas arquitectónicas, isométrico texturizado y cortes A-A\' / B-B\'',
    icon: Sparkles,
  },
]

const lightboxItems: LightboxItem[] = steps.map((s) => ({
  src: s.image,
  alt: s.imageAlt,
  caption: `Paso ${s.number} · ${s.title} — ${s.deliverable}`,
}))

function StepCard({
  step,
  index,
  onOpen,
}: {
  step: Step
  index: number
  onOpen: (i: number) => void
}) {
  const Icon = step.icon
  const reverse = index % 2 === 1
  const delay = 0.04 * index

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay }}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
    >
      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: delay + 0.15 }}
        className={`lg:col-span-5 ${
          reverse ? 'lg:col-start-8 lg:row-start-1' : 'lg:col-start-1'
        }`}
      >
        <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: delay + 0.3 }}
            className="inline-flex items-center justify-center h-10 w-10 border border-line bg-surface/70 text-accent"
          >
            <Icon size={18} strokeWidth={1.4} />
          </motion.span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Paso {step.number} de 0{steps.length}
          </span>
        </div>

        <div className="overflow-hidden">
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.2,
              ease: EASE_OUT_EXPO,
              delay: delay + 0.2,
            }}
            className="font-display text-accent leading-none mb-4 select-none text-center lg:text-left"
            style={{
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              letterSpacing: '-0.05em',
              textShadow: '0 30px 60px rgba(156, 107, 79, 0.18)',
            }}
          >
            {step.number}
          </motion.p>
        </div>

        <div className="overflow-hidden pb-1">
          <motion.h3
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.05,
              ease: EASE_OUT_EXPO,
              delay: delay + 0.32,
            }}
            className="font-display font-medium text-ink leading-[1.05] mb-6 text-center lg:text-left"
            style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)' }}
          >
            {step.title}
          </motion.h3>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: delay + 0.45 }}
          className="text-base md:text-lg text-muted leading-relaxed max-w-prose mb-8 text-center lg:text-left mx-auto lg:mx-0"
        >
          {step.description}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="flex flex-wrap items-center gap-2 mb-6 justify-center lg:justify-start"
        >
          {step.tools.map((tool, ti) => {
            const SoftwareIcon = TECH_ICONS[tool]
            return (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  ease: EASE_OUT_EXPO,
                  delay: delay + 0.6 + ti * 0.07,
                }}
                className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-wide border border-line text-muted bg-surface/60 hover:border-accent hover:text-ink transition-colors"
              >
                {SoftwareIcon && (
                  <SoftwareIcon
                    size={14}
                    strokeWidth={5}
                    className="text-accent group-hover:text-ink transition-colors"
                  />
                )}
                {tool}
              </motion.span>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: delay + 0.7 }}
          className="flex items-baseline gap-3 pt-4 border-t border-line/70 justify-center lg:justify-start origin-left"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Entregable
          </span>
          <span className="font-display italic text-ink text-lg">
            {step.deliverable}
          </span>
        </motion.div>
      </motion.div>

      {/* Imagen — clickeable para abrir lightbox */}
      <div
        className={`lg:col-span-6 flex justify-center ${
          reverse
            ? 'lg:col-start-1 lg:row-start-1 lg:justify-start'
            : 'lg:col-start-7 lg:justify-end'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.3,
            ease: EASE_OUT_EXPO,
            delay: delay + 0.1,
          }}
          className="relative w-full max-w-[640px]"
        >
          {/* Back frame con patrón diagonal */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: reverse ? 30 : -30, y: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              ease: EASE_OUT_EXPO,
              delay: delay + 0.4,
            }}
            className="absolute border border-accent/45"
            style={{
              inset: reverse
                ? '-22px -22px 22px 22px'
                : '-22px 22px 22px -22px',
              background:
                'repeating-linear-gradient(45deg, rgba(156,107,79,0.06) 0 2px, transparent 2px 8px)',
            }}
          />
          {/* Tint frame */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: reverse ? -20 : 20, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              ease: EASE_OUT_EXPO,
              delay: delay + 0.5,
            }}
            className="absolute border border-line"
            style={{
              inset: reverse
                ? '18px 18px -18px -18px'
                : '18px -18px -18px 18px',
              background: 'rgba(156, 107, 79, 0.10)',
              boxShadow: '0 20px 60px -30px rgba(28,25,23,0.35)',
            }}
          />

          {/* Imagen clickeable — affordance siempre visible */}
          <button
            type="button"
            onClick={() => onOpen(index)}
            aria-label={`Ampliar ${step.imageAlt}`}
            className="relative block w-full group cursor-zoom-in"
          >
            <SkeletonImage
              src={step.image}
              alt={step.imageAlt}
              className="relative border border-line bg-line transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              style={{
                aspectRatio: '16 / 10',
                boxShadow: '0 30px 80px -40px rgba(28,25,23,0.4)',
              }}
            />

            {/* Badge "Ampliar" siempre visible (top-right) — pulse sutil */}
            <motion.span
              aria-hidden
              animate={{
                boxShadow: [
                  '0 8px 20px -8px rgba(156,107,79,0.45)',
                  '0 12px 28px -8px rgba(156,107,79,0.65)',
                  '0 8px 20px -8px rgba(156,107,79,0.45)',
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-bg text-[10px] uppercase tracking-[0.2em] font-medium border border-accent/80 group-hover:scale-105 transition-transform"
            >
              <Maximize2 size={12} strokeWidth={2} />
              Ampliar
            </motion.span>

            {/* Hint visual al hover desktop — sobre la imagen */}
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(28,25,23,0) 50%, rgba(28,25,23,0.35) 100%)',
              }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-3 bg-bg text-ink text-xs uppercase tracking-[0.25em] border border-accent shadow-xl">
                <Maximize2 size={14} strokeWidth={1.6} />
                Ver en grande
              </span>
            </span>
          </button>

          {/* Hint texto bajo la imagen — explícito para mobile y accesible */}
          <p
            className={`mt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-accent ${
              reverse ? 'justify-center lg:justify-start' : 'justify-center lg:justify-end'
            }`}
          >
            <Maximize2 size={11} strokeWidth={1.8} />
            Tocá para ampliar
          </p>

          {/* Corner ticks */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: delay + 0.7 }}
            className={`absolute -top-2 w-8 h-8 border-t border-accent ${
              reverse ? '-left-2 border-l' : '-right-2 border-r'
            }`}
          />
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: delay + 0.8 }}
            className={`absolute -bottom-2 w-8 h-8 border-b border-accent ${
              reverse ? '-right-2 border-r' : '-left-2 border-l'
            }`}
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: delay + 0.9 }}
            className={`mt-6 text-xs text-muted italic ${
              reverse ? 'text-center lg:text-left' : 'text-center lg:text-right'
            }`}
          >
            Fig. {step.number} — {step.deliverable}
          </motion.p>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default function MiProceso() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const open = openIndex !== null

  return (
    <Section id="proceso" padding="large">
      <SectionHeading
        number="04"
        eyebrow="Mi proceso"
        icon={Compass}
        title={
          <>
            Del plano frío al{' '}
            <span className="italic text-muted">render que enamora.</span>
          </>
        }
      />

      <p className="text-base md:text-lg text-muted max-w-2xl mb-20 -mt-4 text-center lg:text-left mx-auto lg:mx-0">
        Cada proyecto recorre cuatro etapas. No hay atajos: la calidad del
        render final depende del rigor con que se hizo la planimetría. Tocá
        cualquier imagen para verla en detalle.
      </p>

      <div className="flex flex-col gap-24 lg:gap-32">
        {steps.map((step, index) => (
          <StepCard
            key={step.number}
            step={step}
            index={index}
            onOpen={setOpenIndex}
          />
        ))}
      </div>

      {open && (
        <Suspense fallback={null}>
          <Lightbox
            open={open}
            items={lightboxItems}
            index={openIndex ?? 0}
            onClose={() => setOpenIndex(null)}
            onPrev={() =>
              setOpenIndex((i) => (i === null ? null : Math.max(0, i - 1)))
            }
            onNext={() =>
              setOpenIndex((i) =>
                i === null ? null : Math.min(steps.length - 1, i + 1)
              )
            }
          />
        </Suspense>
      )}
    </Section>
  )
}
