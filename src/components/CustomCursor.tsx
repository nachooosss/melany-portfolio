import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEnabled(true)

    const cursor = cursorRef.current!
    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    const checkTarget = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = t.closest('a, button, [data-cursor-hover]')
      if (interactive) {
        cursor.classList.add('grow')
      } else {
        cursor.classList.remove('grow')
      }
      const cursorAttr = document.body.getAttribute('data-cursor')
      if (cursorAttr === 'drag') {
        cursor.classList.add('grow', 'label-visible')
        setLabel('drag')
      } else {
        cursor.classList.remove('label-visible')
        setLabel('')
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', checkTarget)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkTarget)
    }
  }, [])

  if (!enabled) return null
  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden>
      <span className="custom-cursor-label">{label}</span>
    </div>
  )
}
