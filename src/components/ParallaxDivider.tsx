import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type Props = {
  word: string
  subword?: string
  accent?: boolean
}

export default function ParallaxDivider({ word, subword, accent = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xMain = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const xSub = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.9, 0])
  const glowY = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative overflow-hidden py-32 md:py-48 border-t border-b border-line"
      style={{
        background:
          'linear-gradient(180deg, rgba(245,241,236,1) 0%, rgba(235,228,218,1) 50%, rgba(245,241,236,1) 100%)',
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: glowY,
          opacity: glowOpacity,
          background: accent
            ? 'radial-gradient(ellipse at center, rgba(156, 107, 79, 0.28) 0%, rgba(156, 107, 79, 0) 60%)'
            : 'radial-gradient(ellipse at center, rgba(107, 95, 85, 0.22) 0%, rgba(107, 95, 85, 0) 60%)',
        }}
      />

      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
        <motion.p
          style={{ x: xMain, opacity }}
          className="font-display text-[18vw] md:text-[16vw] leading-[0.85] text-ink/10 whitespace-nowrap select-none"
        >
          {word}
        </motion.p>
        {subword && (
          <motion.p
            style={{ x: xSub, opacity }}
            className="font-display italic text-[14vw] md:text-[12vw] leading-[0.85] text-accent/30 whitespace-nowrap select-none -mt-[8vw]"
          >
            {subword}
          </motion.p>
        )}
      </div>

      <div className="relative z-10 section-gutter max-content flex items-center justify-between text-xs uppercase tracking-widest text-muted">
        <span>Panamá · 2026</span>
        <span className="h-px flex-1 bg-line mx-6 hidden md:block" />
        <span className="hidden md:block">Visualización 3D</span>
      </div>
    </section>
  )
}
