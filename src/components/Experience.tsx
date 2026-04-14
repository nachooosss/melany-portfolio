import { motion } from 'framer-motion'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="section-gutter py-24 md:py-32 border-t border-line">
      <div className="max-content">
        <SectionHeading
          number="03"
          eyebrow="Experiencia"
          title={
            <>
              Proyectos <span className="italic text-muted">seleccionados</span>
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          <motion.aside variants={fadeUp} className="lg:col-span-3 hidden lg:block">
            <p className="text-xs uppercase tracking-widest text-muted">Línea temporal</p>
            <p className="mt-3 font-display text-2xl leading-tight">2025 — 2026</p>
          </motion.aside>

          <div className="lg:col-span-9 relative pl-8 md:pl-12">
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={revealViewport}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top' }}
              className="absolute left-0 top-2 bottom-2 w-px bg-line"
            />

            <div className="space-y-16">
              {cv.experience.map((job, i) => (
                <motion.article key={i} variants={fadeUp} className="relative">
                  <span className="absolute -left-8 md:-left-12 top-2 w-2 h-2 rounded-full bg-accent" />

                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <h3 className="font-display text-2xl md:text-3xl">{job.title}</h3>
                    <span className="text-sm text-muted font-mono">{job.dates}</span>
                  </div>
                  <p className="text-muted mt-1">{job.place}</p>

                  <ul className="mt-6 space-y-3 max-w-prose">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-ink/90">
                        <span className="mt-[0.65rem] h-px w-4 bg-accent shrink-0" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
