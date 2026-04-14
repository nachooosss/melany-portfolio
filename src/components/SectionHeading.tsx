import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { fadeUp, revealViewport } from '../hooks/useScrollReveal'

type Props = {
  number: string
  eyebrow: string
  title: React.ReactNode
  align?: 'left' | 'right'
}

export default function SectionHeading({ number, eyebrow, title, align = 'left' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.floor(v)).padStart(2, '0'))

  useEffect(() => {
    if (inView) {
      const target = parseInt(number, 10)
      const controls = animate(count, target, {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      })
      return () => controls.stop()
    }
  }, [inView, number, count])

  return (
    <div ref={ref} className="relative mb-16">
      <div
        className="absolute inset-0 flex items-start pointer-events-none select-none"
        aria-hidden
        style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}
      >
        <motion.span
          className="ghost-number"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {number}
        </motion.span>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="relative pt-12"
      >
        <div className="flex items-baseline gap-4">
          <motion.span className="section-number">
            <motion.span>{rounded}</motion.span>
            <span> — {eyebrow}</span>
          </motion.span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 leading-[0.95]">
          {title}
        </h2>
      </motion.div>
    </div>
  )
}
