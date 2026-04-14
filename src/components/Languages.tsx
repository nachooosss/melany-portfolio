import { motion } from 'framer-motion'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'

export default function Languages() {
  return (
    <section id="languages" className="section-gutter py-24 md:py-32 border-t border-line">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        <motion.div variants={fadeUp} className="lg:col-span-4">
          <p className="section-number">06 — Idiomas</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            Comunicación
          </h2>
        </motion.div>

        <motion.ul variants={fadeUp} className="lg:col-span-7 lg:col-start-6 space-y-6">
          {cv.languages.map((lang) => (
            <li key={lang.name} className="border-t border-line pt-5">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl">{lang.name}</span>
                <span className="text-sm text-muted">{lang.level}</span>
              </div>
              <div className="mt-3 flex gap-2" aria-label={`Nivel ${lang.score} de 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 ${i < lang.score ? 'bg-accent' : 'bg-line'}`}
                  />
                ))}
              </div>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
