import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading
        number="04"
        eyebrow="Formación"
        icon={GraduationCap}
        title="Academia"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        <motion.div variants={fadeUp} className="lg:col-span-9 lg:col-start-4 space-y-6">
          {cv.education.map((ed, i) => (
            <div key={i} className="border-t border-line pt-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <h3 className="font-display text-2xl md:text-3xl">{ed.degree}</h3>
                <span className="text-sm text-muted font-mono">{ed.dates}</span>
              </div>
              <p className="text-muted mt-1">
                {ed.school} · {ed.location}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
