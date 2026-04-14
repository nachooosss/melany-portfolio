import { motion } from 'framer-motion'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'

export default function About() {
  return (
    <section id="about" className="section-gutter py-24 md:py-32 border-t border-line">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        <motion.div variants={fadeUp} className="lg:col-span-4">
          <p className="section-number">01 — Sobre mí</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
            Diseño con <span className="italic text-muted">intención</span>.
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-6 max-w-prose text-ink/90">
            {cv.profile.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
