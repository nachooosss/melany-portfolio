import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
} from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { fadeUp, revealViewport } from '../hooks/useScrollReveal'

type Props = {
  number: string
  eyebrow: string
  title: React.ReactNode
  align?: 'left' | 'right'
  icon?: LucideIcon
}

export default function SectionHeading({
  number,
  eyebrow,
  title,
  align = 'left',
  icon: Icon,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-4%', '10%'])
  const ghostY = useTransform(scrollYProgress, [0, 1], ['0px', '-30px'])

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
      <motion.div
        className={`absolute inset-0 flex items-start pointer-events-none select-none justify-center ${
          align === 'right' ? 'md:justify-end' : 'md:justify-start'
        }`}
        aria-hidden
        style={{
          x: ghostX,
          y: ghostY,
        }}
      >
        <motion.span
          className="ghost-number"
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(14px)' }}
          animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {number}
        </motion.span>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="relative pt-12 text-center md:text-left"
      >
        <div className="flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-5 mb-5 justify-center md:justify-start">
          {Icon && (
            <motion.span
              className="section-icon"
              initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <Icon size={22} strokeWidth={1.3} className="text-accent" />
            </motion.span>
          )}
          <span className="section-number inline-flex items-baseline gap-2">
            <motion.span>{rounded}</motion.span>
            <span className="text-muted">—</span>
            <span>{eyebrow}</span>
          </span>
        </div>

        <div className="overflow-hidden pb-2">
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95]"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
          >
            {title}
          </motion.h2>
        </div>

        <motion.div
          className="ornament-rule mt-6 max-w-sm mx-auto md:mx-0 origin-center md:origin-left"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          <span className="ornament-glyph" aria-hidden />
        </motion.div>
      </motion.div>
    </div>
  )
}
