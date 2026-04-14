import { cv } from '../data/cv'

export default function Ticker() {
  const items = [...cv.tools, ...cv.tools, ...cv.tools]
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        <span>
          {items.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </span>
        <span>
          {items.map((t, i) => (
            <span key={`dup-${i}`}>{t}</span>
          ))}
        </span>
      </div>
    </div>
  )
}
