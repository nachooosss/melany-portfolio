import { motion } from 'framer-motion'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'

export default function Education() {
  return (
    <section id="education" className="section-gutter py-24 md:py-32 border-t border-line">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        <motion.div variants={fadeUp} className="lg:col-span-4">
          <p className="section-number">03 — Formación</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4">Academia</h2>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-7 lg:col-start-6 space-y-6">
          {cv.education.map((ed, i) => (
            <div key={i} className="border-t border-line pt-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <h3 className="font-display text-2xl">{ed.degree}</h3>
                <span className="text-sm text-muted font-mono">{ed.dates}</span>
              </div>
              <p className="text-muted mt-1">
                {ed.school} · {ed.location}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
