import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'

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
          {cv.certifications.map((c, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex items-baseline justify-between gap-4 py-5 border-t border-line first:border-t-0"
            >
              <div>
                <p className="font-display text-xl md:text-2xl">{c.name}</p>
                <p className="text-sm text-muted mt-1">{c.issuer}</p>
              </div>
              <span className="text-sm text-muted font-mono shrink-0">{c.date}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
