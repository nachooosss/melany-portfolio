import { motion } from 'framer-motion'
import { Languages as LanguagesIcon } from 'lucide-react'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'
import Section from './Section'

export default function Languages() {
  return (
    <Section id="languages">
      <SectionHeading
        number="07"
        eyebrow="Idiomas"
        icon={LanguagesIcon}
        title="Comunicación"
      />

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {cv.languages.map((lang) => (
          <motion.li key={lang.name} variants={fadeUp} className="border-t border-line pt-5">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl md:text-3xl">{lang.name}</span>
              <span className="text-sm text-muted">{lang.level}</span>
            </div>
            <div className="mt-3 flex gap-2" aria-label={`Nivel ${lang.score} de 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left' }}
                  className={`h-1.5 flex-1 ${i < lang.score ? 'bg-accent' : 'bg-line'}`}
                />
              ))}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
