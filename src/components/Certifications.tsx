import { motion } from 'framer-motion'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'

export default function Certifications() {
  return (
    <section id="certifications" className="section-gutter py-24 md:py-32 border-t border-line">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        <motion.div variants={fadeUp} className="lg:col-span-4">
          <p className="section-number">05 — Certificaciones</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            Formación <span className="italic text-muted">continua</span>
          </h2>
        </motion.div>

        <motion.ul variants={fadeUp} className="lg:col-span-7 lg:col-start-6">
          {cv.certifications.map((c, i) => (
            <li
              key={i}
              className="flex items-baseline justify-between gap-4 py-5 border-t border-line first:border-t-0"
            >
              <div>
                <p className="font-display text-xl">{c.name}</p>
                <p className="text-sm text-muted mt-1">{c.issuer}</p>
              </div>
              <span className="text-sm text-muted font-mono shrink-0">{c.date}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
