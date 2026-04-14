import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll()
  const [pos, setPos] = useState('0%')
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduced) return
    setPos(`${(v * 100).toFixed(2)}%`)
  })

  return (
    <>
      <div
        aria-hidden
        className="scroll-bg-gradient"
        style={{ backgroundPositionY: reduced ? '0%' : pos }}
      />
      <div
        aria-hidden
        className="scroll-bg-glow"
        style={{ backgroundPositionY: reduced ? '50%' : pos }}
      />
      <div aria-hidden className="scroll-bg-dots" />
      <div aria-hidden className="scroll-bg-grain" />
      <div aria-hidden className="scroll-bg-vignette" />
    </>
  )
}
