import { m as motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.25,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, rgba(156,107,79,0) 0%, rgba(156,107,79,1) 30%, rgba(28,25,23,1) 100%)',
      }}
    />
  )
}
