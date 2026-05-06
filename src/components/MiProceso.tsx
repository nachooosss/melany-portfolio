import { useState, lazy, Suspense } from 'react'
import { m as motion } from 'framer-motion'
import {
  Compass,
  Palette,
  Box,
  Sparkles,
  Maximize2,
  type LucideIcon,
} from 'lucide-react'
import Section from './Section'
import SectionHeading from './SectionHeading'
import SkeletonImage from './SkeletonImage'
import { revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import { EASE_OUT_EXPO } from '../constants/animation'
import type { LightboxItem } from './Lightbox'
import { TECH_ICONS } from './TechIcons'

const Lightbox = lazy(() => import('./Lightbox'))

type StepImage = { src: string; alt: string }

type Step = {
  number: string
  title: string
  description: string
  tools: string[]
  deliverable: string
  images: StepImage[]
  layout?: 'single' | 'collage'
  icon: LucideIcon
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Concepto & moodboard',
    description:
      'Construyo la narrativa: paleta cromática, materiales, mobiliario de inspiración y atmósfera. El espacio cuenta una historia antes de ser modelado — los tonos, las texturas y las formas dialogan con el contexto.',
    tools: ['Photoshop', 'Pinterest', 'Muestrarios físicos'],
    deliverable: 'Lámina conceptual',
    images: [
      {
        src: '/mi-proceso/1-min.webp',
        alt: 'Moodboard Serene Haven con paleta de color, materiales y mobiliario de referencia',
      },
    ],
    icon: Palette,
  },
  {
    number: '02',
    title: 'Análisis & planimetría',
    description:
      'Levanto el espacio existente, estudio circulación, entrada de luz natural y condicionantes técnicas. La planta acotada es la base de toda decisión posterior — sin ese cimiento ningún render se sostiene.',
    tools: ['AutoCAD', 'Levantamiento físico', 'Brief con cliente'],
    deliverable: 'Plano técnico acotado',
    images: [
      {
        src: '/mi-proceso/3-min.webp',
        alt: 'Planos técnicos del proyecto Serene Haven — planta arquitectónica acotada y planta diseñada con propuesta de mobiliario',
      },
    ],
    icon: Compass,
  },
  {
    number: '03',
    title: 'Modelado 3D',
    description:
      'Traduzco el concepto a geometría: planta diseñada, vistas isométricas y cortes técnicos. La maqueta digital permite verificar proporciones, resolver detalles constructivos y anticipar problemas antes de invertir en render fotorrealista.',
    tools: ['SketchUp', 'AutoCAD', 'Layout'],
    deliverable: 'Plano + vistas + cortes',
    layout: 'single',
    images: [
      {
        src: '/mi-proceso/2-min.webp',
        alt: 'Lámina técnica Serene Haven — vistas arquitectónicas con isométrico texturizado y cortes A-A\' / B-B\'',
      },
    ],
    icon: Box,
  },
  {
    number: '04',
    title: 'Visualización',
    description:
      'Aplico materiales reales, iluminación física y postproducción para entregar renders fotorrealistas. El cliente puede recorrer cada ambiente — sala, cocina, dormitorios, baño — antes de construir.',
    tools: ['D5 Render', 'Twinmotion', 'Photoshop'],
    deliverable: 'Renders fotorrealistas',
    layout: 'collage',
    images: [
      {
        src: '/mi-proceso/modelado-3d/1.webp',
        alt: 'Sala de estar Serene Haven — sillones boucle verde, panel de madera ondulado e iluminación cálida',
      },
      {
        src: '/mi-proceso/modelado-3d/2.webp',
        alt: 'Cocina Serene Haven — muebles de madera, isla con frutero y pared de piedra natural',
      },
      {
        src: '/mi-proceso/modelado-3d/3.webp',
        alt: 'Dormitorio Serene Haven — cabecera de rattan, textiles verde musgo y arte geométrico',
      },
      {
        src: '/mi-proceso/modelado-3d/4.webp',
        alt: 'Baño Serene Haven — espejo iluminado, grifería en bronce y revestimiento en piedra',
      },
      {
        src: '/mi-proceso/modelado-3d/5.webp',
        alt: 'Vista de dormitorio Serene Haven — armario translúcido, zona de escritorio y panel de piedra retroiluminado',
      },
    ],
    icon: Sparkles,
  },
]

// El lightbox se scope al paso clickeado — un single sólo abre su imagen,
// el collage permite navegar entre sus N vistas.
function buildStepLightboxItems(step: Step): LightboxItem[] {
  return step.images.map((img, imgIdx) => ({
    src: img.src,
    alt: img.alt,
    caption:
      step.images.length > 1
        ? `Paso ${step.number} · ${step.title} — Vista ${imgIdx + 1} de ${step.images.length}`
        : `Paso ${step.number} · ${step.title} — ${step.deliverable}`,
  }))
}

function SingleImage({
  step,
  onOpen,
}: {
  step: Step
  onOpen: () => void
}) {
  const img = step.images[0]
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ampliar ${img.alt}`}
      className="relative block w-full group cursor-zoom-in"
    >
      <SkeletonImage
        src={img.src}
        alt={img.alt}
        className="relative border border-line bg-line transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        style={{
          aspectRatio: '16 / 10',
          boxShadow: '0 30px 80px -40px rgba(28,25,23,0.4)',
        }}
      />

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
  )
}

/**
 * Bento grid 4×2 para 5 imágenes:
 *   [   HERO 2x2   ][ A ][ B ]
 *   [   HERO 2x2   ][ C ][ D ]
 * En mobile colapsa a 2 cols con hero spanneando full row.
 */
function CollageGrid({
  step,
  onOpen,
}: {
  step: Step
  onOpen: (imgIdx: number) => void
}) {
  const [hero, ...rest] = step.images

  const tile = (img: StepImage, idx: number, extraClass = '') => (
    <button
      key={img.src}
      type="button"
      onClick={() => onOpen(idx)}
      aria-label={`Ampliar ${img.alt}`}
      className={`relative block group cursor-zoom-in overflow-hidden border border-line bg-line ${extraClass}`}
      style={{ boxShadow: '0 12px 30px -18px rgba(28,25,23,0.4)' }}
    >
      <SkeletonImage
        src={img.src}
        alt={img.alt}
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{ width: '100%', height: '100%' }}
      />
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(180deg, rgba(156,107,79,0.0) 40%, rgba(156,107,79,0.55) 100%)',
        }}
      />
      <span
        aria-hidden
        className="absolute bottom-2 right-2 inline-flex items-center justify-center h-8 w-8 bg-bg/90 text-accent border border-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400"
      >
        <Maximize2 size={14} strokeWidth={1.8} />
      </span>
    </button>
  )

  return (
    <div className="relative">
      {/* Badge "05 vistas" siempre visible */}
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
        className="absolute -top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-bg text-[10px] uppercase tracking-[0.2em] font-medium border border-accent/80"
      >
        <Maximize2 size={12} strokeWidth={2} />
        {String(step.images.length).padStart(2, '0')} vistas
      </motion.span>

      {/*
        Bento grid:
          Mobile (2 cols): hero ancho completo + 4 tiles cuadrados en 2×2
          Desktop (4 cols): hero 2×2 + 4 tiles 1×1 a la derecha
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {tile(
          hero,
          0,
          'col-span-2 md:col-span-2 md:row-span-2 aspect-[16/10] md:aspect-square'
        )}
        {rest.map((img, i) => tile(img, i + 1, 'aspect-square'))}
      </div>
    </div>
  )
}

function StepCard({
  step,
  index,
  onOpen,
}: {
  step: Step
  index: number
  onOpen: (stepIdx: number, imgIdx: number) => void
}) {
  const Icon = step.icon
  const reverse = index % 2 === 1
  const delay = 0.04 * index
  const isCollage = step.layout === 'collage'

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

      {/* Imagen / carrusel */}
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
          {/* Back frame */}
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

          {/* Imagen única o collage según layout */}
          {isCollage ? (
            <CollageGrid
              step={step}
              onOpen={(imgIdx) => onOpen(index, imgIdx)}
            />
          ) : (
            <SingleImage
              step={step}
              onOpen={() => onOpen(index, 0)}
            />
          )}

          {/* Hint texto bajo la imagen */}
          <p
            className={`mt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-accent ${
              reverse ? 'justify-center lg:justify-start' : 'justify-center lg:justify-end'
            }`}
          >
            <Maximize2 size={11} strokeWidth={1.8} />
            {isCollage
              ? `Tocá una vista · ${String(step.images.length).padStart(2, '0')} ambientes`
              : 'Tocá para ampliar'}
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
  const [openState, setOpenState] = useState<{
    stepIdx: number
    imgIdx: number
  } | null>(null)
  const open = openState !== null

  const handleOpen = (stepIdx: number, imgIdx: number) => {
    setOpenState({ stepIdx, imgIdx })
  }

  // Items del lightbox = solo las imágenes del paso clickeado.
  const lightboxItems =
    openState !== null ? buildStepLightboxItems(steps[openState.stepIdx]) : []
  const maxIdx = lightboxItems.length - 1

  return (
    <Section id="proceso" padding="large">
      <SectionHeading
        number="04"
        eyebrow="Mi proceso"
        icon={Compass}
        title={
          <>
            Del concepto al{' '}
            <span className="italic text-muted">render que enamora.</span>
          </>
        }
      />

      <p className="text-base md:text-lg text-muted max-w-2xl mb-20 -mt-4 text-center lg:text-left mx-auto lg:mx-0">
        Cada proyecto recorre cuatro etapas. No hay atajos: la calidad del
        render final depende del rigor con que se hizo el concepto y la
        planimetría. Tocá cualquier imagen para verla en detalle.
      </p>

      <div className="flex flex-col gap-24 lg:gap-32">
        {steps.map((step, index) => (
          <StepCard
            key={step.number}
            step={step}
            index={index}
            onOpen={handleOpen}
          />
        ))}
      </div>

      {open && (
        <Suspense fallback={null}>
          <Lightbox
            open={open}
            items={lightboxItems}
            index={openState?.imgIdx ?? 0}
            onClose={() => setOpenState(null)}
            onPrev={() =>
              setOpenState((s) =>
                s === null ? null : { ...s, imgIdx: Math.max(0, s.imgIdx - 1) }
              )
            }
            onNext={() =>
              setOpenState((s) =>
                s === null
                  ? null
                  : { ...s, imgIdx: Math.min(maxIdx, s.imgIdx + 1) }
              )
            }
          />
        </Suspense>
      )}
    </Section>
  )
}
