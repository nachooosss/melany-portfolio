import { motion } from 'framer-motion'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="section-gutter py-24 md:py-32 border-t border-line">
      <div className="max-content">
        <SectionHeading
          number="01"
          eyebrow="Sobre mí"
          title={
            <>
              Diseño con <span className="italic text-muted">intención</span>.
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          <motion.aside variants={fadeUp} className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="border-l-2 border-accent pl-6">
              <p className="font-display text-3xl md:text-4xl leading-tight">
                {cv.pullQuote}
              </p>
              <p className="mt-4 text-sm uppercase tracking-widest text-muted">
                Enfoque
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="text-muted text-xs uppercase tracking-widest">
                  Formación
                </dt>
                <dd className="mt-1 font-display text-base">USMA · 3er año</dd>
              </div>
              <div>
                <dt className="text-muted text-xs uppercase tracking-widest">
                  Ubicación
                </dt>
                <dd className="mt-1 font-display text-base">Panamá</dd>
              </div>
              <div>
                <dt className="text-muted text-xs uppercase tracking-widest">
                  Proyectos
                </dt>
                <dd className="mt-1 font-display text-base">Residencial · Comercial</dd>
              </div>
              <div>
                <dt className="text-muted text-xs uppercase tracking-widest">
                  Modalidad
                </dt>
                <dd className="mt-1 font-display text-base">Presencial · Híbrido · Remoto</dd>
              </div>
            </dl>
          </motion.aside>

          <motion.div variants={fadeUp} className="lg:col-span-7">
            <div className="space-y-6 max-w-prose text-ink/90">
              {cv.profile.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
