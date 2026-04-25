import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'
import {
  AutoCADIcon,
  SketchUpIcon,
  D5Icon,
  TwinmotionIcon,
  PhotoshopIcon,
} from './TechIcons'

const SOFTWARE_ICONS: Record<
  string,
  (props: { size?: number; strokeWidth?: number; className?: string }) => JSX.Element
> = {
  AutoCAD: AutoCADIcon,
  SketchUp: SketchUpIcon,
  'D5 Render': D5Icon,
  Twinmotion: TwinmotionIcon,
  Photoshop: PhotoshopIcon,
}

function Pill({ label }: { label: string }) {
  return (
    <li className="inline-flex items-center border border-line px-4 py-2 text-sm text-ink/90 hover:border-accent hover:text-ink transition-colors duration-300">
      {label}
    </li>
  )
}

function SoftwarePill({ label }: { label: string }) {
  const Icon = SOFTWARE_ICONS[label]
  return (
    <li className="group inline-flex items-center gap-2.5 border border-line px-4 py-2.5 text-sm text-ink/90 hover:border-accent hover:text-ink transition-colors duration-300">
      {Icon && (
        <Icon
          size={18}
          strokeWidth={5}
          className="text-ink group-hover:text-accent transition-colors"
        />
      )}
      <span>{label}</span>
    </li>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-gutter py-24 md:py-32 border-t border-line">
      <div className="max-content">
        <SectionHeading
          number="05"
          eyebrow="Habilidades"
          icon={Palette}
          title={
            <>
              Herramientas &amp; <span className="italic text-muted">criterio</span>
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <h3 className="font-display text-xl mb-6 text-muted">Software</h3>
            <ul className="flex flex-wrap gap-2.5">
              {cv.skills.software.map((s) => (
                <SoftwarePill key={s} label={s} />
              ))}
            </ul>

            <h3 className="font-display text-xl mt-10 mb-6 text-muted">Disciplinas</h3>
            <ul className="flex flex-wrap gap-2">
              {cv.skills.disciplines.map((s) => (
                <Pill key={s} label={s} />
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-6">
            <h3 className="font-display text-xl mb-6 text-muted">Competencias</h3>
            <ul className="space-y-3">
              {cv.skills.soft.map((s, i) => (
                <li
                  key={s}
                  className="flex items-baseline gap-4 border-b border-line pb-3"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
