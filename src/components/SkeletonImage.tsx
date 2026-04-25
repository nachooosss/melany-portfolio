import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  style?: React.CSSProperties
  eager?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
  onErrorFallback?: React.ReactNode
}

export default function SkeletonImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  style,
  eager = false,
  fetchPriority,
  onErrorFallback,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  // Chromium dispara onLoad antes de que React attache el listener cuando la
  // imagen ya está cacheada — chequeamos `complete` post-mount para no quedar
  // colgados en opacity-0.
  useEffect(() => {
    setErrored(false)
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true)
    } else {
      setLoaded(false)
    }
  }, [src])

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!loaded && !errored && <div className="absolute inset-0 skeleton-shimmer" aria-hidden />}
      {errored && onErrorFallback ? (
        <div className="absolute inset-0">{onErrorFallback}</div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          draggable={false}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...{ fetchpriority: fetchPriority ?? (eager ? 'high' : 'low') }}
        />
      )}
    </div>
  )
}
