import { useEffect, useState } from 'react'

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

/**
 * Image with a shimmer skeleton placeholder until the bitmap loads.
 * Fades the image in once onLoad fires.
 */
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
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setErrored(false)
  }, [src])

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!loaded && !errored && <div className="absolute inset-0 skeleton-shimmer" aria-hidden />}
      {errored && onErrorFallback ? (
        <div className="absolute inset-0">{onErrorFallback}</div>
      ) : (
        <img
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
          // React 18 requires lowercase `fetchpriority` — pasarlo via spread bypasea el check
          {...{ fetchpriority: fetchPriority ?? (eager ? 'high' : 'low') }}
        />
      )}
    </div>
  )
}
