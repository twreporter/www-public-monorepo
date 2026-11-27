'use client'

import { useContext, useState } from 'react'
import { Arrow } from '@twreporter/react-typescript-components/lib/icons'
import { BaseContext } from '@/contexts'

export function ArticleSlideshow({
  slides,
}: {
  slides: { url: string; caption?: string }[]
}) {
  const { releaseBranch } = useContext(BaseContext)
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  if (!slide) return null
  return (
    <figure
      className="article-slideshow"
      aria-label="圖片輪播"
      aria-roledescription="carousel"
    >
      {/* biome-ignore lint/performance/noImgElement: CMS media can originate from external hosts. */}
      <img src={slide.url} alt={slide.caption || ''} loading="lazy" />
      <figcaption>
        <div className="article-slide-controls">
          <button
            type="button"
            aria-label="上一張圖片"
            disabled={slides.length < 2}
            onClick={() =>
              setIndex((index + slides.length - 1) % slides.length)
            }
          >
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-full border border-[var(--article-control)] bg-transparent [&_svg]:bg-[var(--article-control)]! hover:border-[var(--article-control-hover)] hover:[&_svg]:bg-[var(--article-control-hover)]!"
            >
              <Arrow
                direction={Arrow.Direction.left}
                releaseBranch={releaseBranch}
              />
            </span>
          </button>
          <span aria-live="polite">
            {index + 1} / {slides.length}
          </span>
          <button
            type="button"
            aria-label="下一張圖片"
            disabled={slides.length < 2}
            onClick={() => setIndex((index + 1) % slides.length)}
          >
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-full border border-[var(--article-control)] bg-transparent [&_svg]:bg-[var(--article-control)]! hover:border-[var(--article-control-hover)] hover:[&_svg]:bg-[var(--article-control-hover)]!"
            >
              <Arrow
                direction={Arrow.Direction.right}
                releaseBranch={releaseBranch}
              />
            </span>
          </button>
        </div>
        <p aria-live="polite">{slide.caption}</p>
      </figcaption>
    </figure>
  )
}
