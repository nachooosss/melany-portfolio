import type { Variants } from 'framer-motion'
import { EASE_OUT_EXPO } from '../constants/animation'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const revealViewport = {
  once: true,
  amount: 0.2,
}
