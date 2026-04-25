import { m as motion } from 'framer-motion'
import {
  Briefcase,
  Bed,
  Lamp,
  Archive,
  Sparkles,
  BookOpen,
  Flower2,
  Leaf,
  Brush,
  Recycle,
  Sun,
  Store,
  Droplets,
  Wrench,
  Palette,
  type LucideIcon,
} from 'lucide-react'
import { cv, type ExperienceItem } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'
import MoodboardCarousel from './MoodboardCarousel'
import { TECH_ICONS } from './TechIcons'
import { EASE_OUT_EXPO } from '../constants/animation'

const ICON_MAP: Record<string, LucideIcon> = {
  Bed,
  Lamp,
  Archive,
  Sparkles,
  BookOpen,
  Flower2,
  Leaf,
  Brush,
  Recycle,
  Sun,
  Store,
  Droplets,
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-gutter py-24 md:py-32 border-t border-line"
    >
      <div className="max-content">
        <SectionHeading
          number="03"
          eyebrow="Experiencia"
          icon={Briefcase}
          title={
            <>
              Mi <span className="italic text-muted">trayectoria</span>
            </>
          }
        />

        <div className="relative">
          {/* Línea temporal vertical central (desktop) */}
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={revealViewport}
            transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: 'top' }}
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-line"
            aria-hidden
          />

          {/* Línea temporal lateral (mobile) */}
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={revealViewport}
            transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: 'top' }}
            className="lg:hidden absolute left-3 top-0 bottom-0 w-px bg-line"
            aria-hidden
          />

          <div className="space-y-20 md:space-y-28 lg:space-y-40">
            {cv.experience.map((project, i) => (
              <ProjectMilestone
                key={i}
                project={project}
                index={i}
                yearOnLeft={i % 2 === 0}
              />
            ))}
          </div>

          {/* Marca de cierre al final de la línea */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={revealViewport}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT_EXPO }}
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-3 items-center justify-center"
          >
            <span className="h-3 w-3 bg-accent rotate-45" aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

type MilestoneProps = {
  project: ExperienceItem
  index: number
  yearOnLeft: boolean
}

function ProjectMilestone({ project, yearOnLeft }: MilestoneProps) {
  return (
    <motion.article
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 pl-8 sm:pl-10 lg:pl-0"
    >
      {/* Dot en la línea (desktop) */}
      <motion.span
        variants={fadeUp}
        aria-hidden
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 z-10"
      >
        <span className="block h-5 w-5 rounded-full bg-accent ring-[6px] ring-bg" />
      </motion.span>

      {/* Dot mobile */}
      <span
        aria-hidden
        className="lg:hidden absolute left-3 top-8 -translate-x-1/2 h-4 w-4 rounded-full bg-accent ring-[5px] ring-bg z-10"
      />

      {/* AÑO + MOODBOARD CAROUSEL (alterna lado) */}
      <YearBlock
        project={project}
        align={yearOnLeft ? 'right' : 'left'}
        className={
          yearOnLeft
            ? 'lg:order-1 lg:pr-12 lg:text-right'
            : 'lg:order-2 lg:pl-12 lg:text-left'
        }
      />

      {/* CONTENIDO (alterna lado) */}
      <div
        className={
          yearOnLeft ? 'lg:order-2 lg:pl-16' : 'lg:order-1 lg:pr-16'
        }
      >
        <ContentBlock project={project} />
      </div>
    </motion.article>
  )
}

function YearBlock({
  project,
  align,
  className = '',
}: {
  project: ExperienceItem
  align: 'left' | 'right'
  className?: string
}) {
  return (
    <motion.div variants={fadeUp} className={`relative ${className}`}>
      <div className="relative">
        {/* Capa 3 — back frame con patrón diagonal (offset top-left) */}
        <div
          aria-hidden
          className="absolute border border-accent/45 pointer-events-none"
          style={{
            inset: '-22px 22px 22px -22px',
            background:
              'repeating-linear-gradient(45deg, rgba(156,107,79,0.06) 0 2px, transparent 2px 8px)',
          }}
        />

        {/* Capa 2 — middle tint (offset bottom-right) */}
        <div
          aria-hidden
          className="absolute border border-line pointer-events-none"
          style={{
            inset: '18px -18px -18px 18px',
            background: 'rgba(156, 107, 79, 0.12)',
            boxShadow: '0 20px 60px -30px rgba(28,25,23,0.35)',
          }}
        />

        {/* Capa 1 — moodboard carousel */}
        <div className="relative w-full">
          <MoodboardCarousel
            images={project.moodboardImages}
            alt={`Moodboard ${project.title}`}
          >
          <div
            className={`flex flex-col h-full ${
              align === 'right' ? 'items-end text-right' : 'items-start text-left'
            }`}
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] mb-3"
              style={{ color: 'rgba(245, 241, 236, 0.85)' }}
            >
              {project.category}
            </span>

            <span
              className="font-display font-medium leading-[0.85]"
              style={{
                fontSize: 'clamp(4.5rem, 11vw, 9rem)',
                color: '#F2EBDC',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.45)',
              }}
            >
              {project.year}
            </span>

            <div className="mt-auto flex flex-col gap-3">
              <span
                className="font-display italic text-lg md:text-xl"
                style={{
                  color: '#F2EBDC',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                {project.dates}
              </span>
              <span
                className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 self-${
                  align === 'right' ? 'end' : 'start'
                }`}
                style={{
                  color: '#F2EBDC',
                  background: 'rgba(28, 25, 23, 0.55)',
                  border: '1px solid rgba(245, 241, 236, 0.4)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {project.area}
              </span>
            </div>
          </div>
          </MoodboardCarousel>
        </div>

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
    </motion.div>
  )
}

function ContentBlock({ project }: { project: ExperienceItem }) {
  return (
    <div className="space-y-8">
      {/* TÍTULO */}
      <motion.div variants={fadeUp}>
        <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-muted">
          {project.client} · {project.place}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30">
          <Palette size={12} strokeWidth={1.8} className="text-accent" />
          <span className="text-xs font-display italic text-accent">
            {project.concept}
          </span>
        </div>
      </motion.div>

      {/* STATS — números grandes estilo infografía */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-3 gap-2 sm:gap-4 py-4 sm:py-5 border-y border-line"
      >
        {project.stats.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col min-w-0 ${
              i > 0 ? 'border-l border-line pl-2 sm:pl-4' : ''
            }`}
          >
            <span className="font-display font-medium text-xl sm:text-2xl md:text-3xl text-ink leading-none break-words">
              {s.value}
            </span>
            <span className="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted leading-tight">
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* OBJETOS — stickers con iconos */}
      <motion.div variants={fadeUp}>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-4 text-center lg:text-left">
          Elementos del proyecto
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-x-2 gap-y-5">
          {project.objects.map((obj) => {
            const Icon = ICON_MAP[obj.iconName] ?? Sparkles
            return (
              <motion.div
                key={obj.iconName}
                whileHover={{ y: -4, scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="group flex flex-col items-center gap-2.5 w-full px-1"
              >
                <span
                  className="relative flex items-center justify-center h-14 w-14 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-surface border border-line group-hover:border-accent transition-colors shrink-0"
                  style={{
                    boxShadow: '0 10px 24px -14px rgba(28, 25, 23, 0.3)',
                  }}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.4}
                    className="text-ink group-hover:text-accent transition-colors"
                  />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="text-[9px] sm:text-[8.5px] uppercase tracking-[0.08em] text-muted text-center leading-[1.25] break-words hyphens-auto max-w-full">
                  {obj.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* PALETA */}
      <motion.div variants={fadeUp}>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-3 text-center lg:text-left">
          Paleta cromática
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-2 max-w-[260px] sm:max-w-none mx-auto sm:mx-0 justify-items-center sm:justify-items-stretch">
          {project.palette.map((s) => (
            <div key={s.hex} className="group w-full max-w-[90px] sm:max-w-none">
              <div
                className="aspect-square w-full border border-line/60"
                style={{ backgroundColor: s.hex }}
                title={`${s.name} · ${s.hex}`}
              />
              <p className="mt-1.5 text-[9px] uppercase tracking-[0.08em] text-muted leading-tight">
                {s.name}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* HIGHLIGHTS — bullets numerados */}
      <motion.div variants={fadeUp}>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted mb-4">
          Hitos del proyecto
        </p>
        <ul className="space-y-4">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-accent text-xs pt-1 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-[15px] leading-relaxed text-ink/90">
                {h}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* MATERIALES + TOOLS strip */}
      <motion.div
        variants={fadeUp}
        className="pt-6 border-t border-line space-y-4"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted">
            Materiales
          </span>
          <div className="flex flex-wrap gap-2">
            {project.materials.map((m) => (
              <span
                key={m}
                className="text-xs text-ink border-b border-line pb-0.5"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted">
            <Wrench size={11} strokeWidth={1.8} />
            Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => {
              const Icon = TECH_ICONS[tool]
              return (
                <span
                  key={tool}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs text-ink border border-line hover:border-accent transition-colors"
                >
                  {Icon && (
                    <Icon
                      size={16}
                      strokeWidth={5}
                      className="text-ink group-hover:text-accent transition-colors"
                    />
                  )}
                  <span>{tool}</span>
                </span>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
