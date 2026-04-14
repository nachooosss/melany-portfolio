import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'

export default function Contact() {
  return (
    <section id="contact" className="section-gutter py-24 md:py-40 border-t border-line">
      <div className="max-content">
        <SectionHeading
          number="08"
          eyebrow="Contacto"
          title={
            <>
              ¿Trabajamos <span className="italic text-muted">juntos?</span>
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl"
        >
          <motion.a
            variants={fadeUp}
            href={`mailto:${cv.personal.email}`}
            className="group flex items-start gap-4 border-t border-line pt-6 hover:border-accent transition-colors"
          >
            <Mail size={20} strokeWidth={1.5} className="mt-1 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Email</p>
              <p className="font-display text-xl md:text-2xl mt-1 link-underline">
                {cv.personal.email}
              </p>
            </div>
          </motion.a>

          <motion.a
            variants={fadeUp}
            href={`tel:${cv.personal.phoneRaw}`}
            className="group flex items-start gap-4 border-t border-line pt-6 hover:border-accent transition-colors"
          >
            <Phone size={20} strokeWidth={1.5} className="mt-1 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Teléfono</p>
              <p className="font-display text-xl md:text-2xl mt-1 link-underline">
                {cv.personal.phone}
              </p>
            </div>
          </motion.a>

          <motion.a
            variants={fadeUp}
            href={cv.personal.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-4 border-t border-line pt-6 hover:border-accent transition-colors"
          >
            <MapPin size={20} strokeWidth={1.5} className="mt-1 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Ubicación</p>
              <p className="font-display text-xl md:text-2xl mt-1 link-underline">
                {cv.personal.location}
              </p>
            </div>
          </motion.a>

          <motion.a
            variants={fadeUp}
            href={cv.personal.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-4 border-t border-line pt-6 hover:border-accent transition-colors"
          >
            <Linkedin size={20} strokeWidth={1.5} className="mt-1 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">LinkedIn</p>
              <p className="font-display text-xl md:text-2xl mt-1 link-underline">
                {cv.personal.linkedin.label}
              </p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
