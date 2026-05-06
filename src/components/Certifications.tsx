import { m as motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'
import Section from './Section'
import { getIconsForLabel } from './TechIcons'

export default function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        number="07"
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
          const icons = getIconsForLabel(c.name)
          return (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-5 border-t border-line first:border-t-0"
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
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg sm:text-xl md:text-2xl leading-tight break-words">
                    {c.name}
                  </p>
                  <p className="text-sm text-muted mt-1">{c.issuer}</p>
                </div>
              </div>
              <span className="text-sm text-muted font-mono shrink-0 self-start sm:self-auto pl-14 sm:pl-0">
                {c.date}
              </span>
            </motion.li>
          )
        })}
      </motion.ul>
    </Section>
  )
}
