import { motion } from 'framer-motion'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'

function Pill({ label }: { label: string }) {
  return (
    <li className="inline-flex items-center border border-line px-4 py-2 text-sm text-ink/90 hover:border-accent hover:text-ink transition-colors duration-300">
      {label}
    </li>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-gutter py-24 md:py-32 border-t border-line">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <motion.div variants={fadeUp} className="mb-16">
          <p className="section-number">04 — Habilidades</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            Herramientas &amp; <span className="italic text-muted">criterio</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <h3 className="font-display text-xl mb-6 text-muted">Software</h3>
            <ul className="flex flex-wrap gap-2">
              {cv.skills.software.map((s) => (
                <Pill key={s} label={s} />
              ))}
            </ul>

            <h3 className="font-display text-xl mt-10 mb-6 text-muted">Técnicas</h3>
            <ul className="flex flex-wrap gap-2">
              {cv.skills.technical.map((s) => (
                <Pill key={s} label={s} />
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-6 lg:col-start-7">
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
        </div>
      </motion.div>
    </section>
  )
}
