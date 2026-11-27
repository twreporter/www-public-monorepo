'use client'

import { useState } from 'react'
import clsx from 'clsx'
import ImageWithSkeleton from '@/components/image-with-skeleton'

export default function HeroImage({ src, alt }: { src: string; alt: string }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading'
  )

  return (
    <div
      aria-busy={status === 'loading'}
      className="relative aspect-[3/2] w-full overflow-hidden bg-[var(--article-placeholder)]"
    >
      <ImageWithSkeleton
        src={src}
        alt={alt}
        width={1600}
        height={1067}
        priority
        fetchPriority="high"
        sizes="(min-width: 1440px) 1061px, (min-width: 1024px) calc(83.333vw - 85.333px), (min-width: 768px) calc(100vw - 64px), 100vw"
        className={clsx(
          'absolute inset-0 h-full w-full object-cover',
          status !== 'loaded' && 'opacity-0'
        )}
        onLoad={() =>
          setStatus((current) => (current === 'error' ? 'error' : 'loaded'))
        }
        onError={() => setStatus('error')}
      />
      {status === 'loading' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-[var(--article-placeholder)] motion-reduce:animate-none"
        />
      )}
      {status === 'error' && (
        <p className="absolute inset-0 flex items-center justify-center p-6 text-center font-default text-sm text-[var(--article-secondary)]">
          圖片暫時無法載入
        </p>
      )}
    </div>
  )
}
