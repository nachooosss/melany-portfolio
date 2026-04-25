import { m as motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  MessageCircle,
  ArrowRight,
  Instagram,
} from 'lucide-react'
import { cv } from '../data/cv'
import { fadeUp, revealViewport, staggerContainer } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'
import Section from './Section'
import { EASE_OUT_EXPO } from '../constants/animation'

export default function Contact() {
  return (
    <Section id="contact" padding="large">
      <SectionHeading
        number="08"
        eyebrow="Contacto"
        icon={Send}
        title={
          <>
            ¿Trabajamos <span className="italic text-muted">juntos?</span>
          </>
        }
        />

        {/* CTA principal — WhatsApp directo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mb-16 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <p className="text-base md:text-lg text-muted max-w-prose mb-6">
            Cuéntame sobre tu proyecto. Respondo personalmente por WhatsApp y
            normalmente en menos de 24 horas.
          </p>

          <motion.a
            href={cv.personal.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Escribirme por WhatsApp"
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="group relative inline-flex items-center gap-4 pl-6 pr-7 py-5 text-bg overflow-hidden self-center md:self-start"
            style={{
              background:
                'linear-gradient(135deg, rgba(156,107,79,1) 0%, rgba(128,82,57,1) 100%)',
              border: '1px solid rgba(156, 107, 79, 0.9)',
              boxShadow:
                '0 24px 50px -18px rgba(156, 107, 79, 0.55), 0 6px 16px -6px rgba(28, 25, 23, 0.18), inset 0 1px 0 rgba(245, 241, 236, 0.18)',
            }}
          >
            {/* Pulse ring atrás */}
            <motion.span
              aria-hidden
              className="absolute inset-0 border-2 border-accent pointer-events-none"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.6, 0, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />

            {/* Llenado cream en hover desde la izquierda */}
            <span
              aria-hidden
              className="absolute inset-0 bg-bg origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
            />

            {/* Icono WhatsApp con halo pulsante */}
            <span className="relative flex items-center justify-center h-11 w-11 border border-bg/50 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
              <MessageCircle
                size={22}
                strokeWidth={1.8}
                className="text-bg group-hover:text-accent transition-colors"
              />
              <motion.span
                aria-hidden
                className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-bg group-hover:bg-accent transition-colors"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </span>

            <span className="relative flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-[0.25em] opacity-80 group-hover:text-accent group-hover:opacity-100 transition-colors">
                WhatsApp directo
              </span>
              <span className="font-display text-xl md:text-2xl leading-none mt-1 group-hover:text-ink transition-colors">
                Escríbeme ahora
              </span>
            </span>

            <ArrowRight
              size={22}
              strokeWidth={1.8}
              className="relative ml-2 transition-transform group-hover:translate-x-1.5 group-hover:text-ink"
            />
          </motion.a>

          <p className="mt-4 text-xs text-muted">
            o usa cualquiera de los canales debajo
          </p>
        </motion.div>

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

          <motion.a
            variants={fadeUp}
            href={cv.personal.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-4 border-t border-line pt-6 hover:border-accent transition-colors"
          >
            <Instagram size={20} strokeWidth={1.5} className="mt-1 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Instagram</p>
              <p className="font-display text-xl md:text-2xl mt-1 link-underline">
                {cv.personal.instagram.label}
              </p>
            </div>
          </motion.a>
      </motion.div>
    </Section>
  )
}
