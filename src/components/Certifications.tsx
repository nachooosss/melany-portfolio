import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
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

type IconComponent = (props: {
  size?: number
  strokeWidth?: number
  className?: string
}) => JSX.Element

/**
 * Devuelve los iconos relacionados a un nombre de certificación.
 * Una cert puede mencionar varios softwares (ej: "D5 y Twinmotion").
 */
function getIconsForCert(name: string): IconComponent[] {
  const icons: IconComponent[] = []
  const lower = name.toLowerCase()
  if (lower.includes('autocad')) icons.push(AutoCADIcon)
  if (lower.includes('sketchup')) icons.push(SketchUpIcon)
  if (lower.includes('d5')) icons.push(D5Icon)
  if (lower.includes('twinmotion')) icons.push(TwinmotionIcon)
  if (lower.includes('photoshop')) icons.push(PhotoshopIcon)
  return icons
}

export default function Certifications() {
  return (
    <section id="certifications" className="section-gutter py-24 md:py-32 border-t border-line">
      <div className="max-content">
        <SectionHeading
          number="06"
          eyebrow="Certificaciones"
          icon={Award}
          title={
            <>
              Formación <span className="italic text-muted">continua</span>
            </>
          }
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="lg:col-span-9"
        >
          {cv.certifications.map((c, i) => {
            const icons = getIconsForCert(c.name)
            return (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-center justify-between gap-4 py-5 border-t border-line first:border-t-0"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {icons.length > 0 && (
                    <div className="flex items-center gap-2 shrink-0">
                      {icons.map((Icon, j) => (
                        <span
                          key={j}
                          className="flex items-center justify-center h-10 w-10 border border-line text-ink"
                        >
                          <Icon size={20} strokeWidth={5} />
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-display text-xl md:text-2xl truncate">
                      {c.name}
                    </p>
                    <p className="text-sm text-muted mt-1">{c.issuer}</p>
                  </div>
                </div>
                <span className="text-sm text-muted font-mono shrink-0">{c.date}</span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
