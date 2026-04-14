import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'

export default function Contact() {
  return (
    <section id="contact" className="section-gutter py-24 md:py-40 border-t border-line">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        <motion.p variants={fadeUp} className="section-number">
          07 — Contacto
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-display mt-6 leading-[0.95]"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          ¿Trabajamos <span className="italic text-muted">juntos?</span>
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl"
        >
          <a
            href={`mailto:${cv.personal.email}`}
            className="group flex items-start gap-4 border-t border-line pt-6 hover:border-accent transition-colors"
          >
            <Mail size={20} strokeWidth={1.5} className="mt-1 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Email</p>
              <p className="font-display text-xl md:text-2xl mt-1 group-hover:text-accent transition-colors">
                {cv.personal.email}
              </p>
            </div>
          </a>

          <a
            href={`tel:${cv.personal.phone}`}
            className="group flex items-start gap-4 border-t border-line pt-6 hover:border-accent transition-colors"
          >
            <Phone size={20} strokeWidth={1.5} className="mt-1 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Teléfono</p>
              <p className="font-display text-xl md:text-2xl mt-1 group-hover:text-accent transition-colors">
                {cv.personal.phone}
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4 border-t border-line pt-6">
            <MapPin size={20} strokeWidth={1.5} className="mt-1 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Ubicación</p>
              <p className="font-display text-xl md:text-2xl mt-1">
                {cv.personal.location}
              </p>
            </div>
          </div>

          <a
            href={cv.personal.linkedin.url}
            className="group flex items-start gap-4 border-t border-line pt-6 hover:border-accent transition-colors"
          >
            <Linkedin size={20} strokeWidth={1.5} className="mt-1 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">LinkedIn</p>
              <p className="font-display text-xl md:text-2xl mt-1 group-hover:text-accent transition-colors">
                {cv.personal.linkedin.label}
              </p>
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
