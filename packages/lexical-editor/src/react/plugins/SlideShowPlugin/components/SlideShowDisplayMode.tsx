import { type FC, useState } from 'react'

import { useImageConfig } from '../../../context/ImageConfigContext'
import type { SlideShowSlide } from '../types'

type SlideShowDisplayModeProps = {
  slides: SlideShowSlide[]
  editable?: boolean
  onEdit?: () => void
}

const SlideShowDisplayMode: FC<SlideShowDisplayModeProps> = ({
  editable = false,
  onEdit,
  slides,
}) => {
  const imageConfig = useImageConfig()
  const [currentIndex, setCurrentIndex] = useState(0)
  const safeCurrentIndex = Math.min(currentIndex, Math.max(slides.length - 1, 0))
  const currentSlide = slides[safeCurrentIndex]
  const rawSrcSet = currentSlide
    ? imageConfig?.getDbImageSrcSet?.(currentSlide.url)
    : undefined
  const srcSet = rawSrcSet?.trim() ? rawSrcSet : undefined

  if (!currentSlide) {
    return null
  }

  const previous = () => {
    setCurrentIndex((index) => Math.max(0, index - 1))
  }

  const next = () => {
    setCurrentIndex((index) => Math.min(slides.length - 1, index + 1))
  }

  return (
    <div className="SlideShow__container">
      <div
        className={`SlideShow__media ${editable ? 'is-editable' : ''}`}
        onClick={editable ? onEdit : undefined}
      >
        <figure itemScope itemType="http://schema.org/ImageObject">
          <img
            src={currentSlide.url}
            srcSet={srcSet}
            alt={currentSlide.caption}
            aria-label={currentSlide.caption}
            className="SlideShow__image"
          />
        </figure>
        {editable ? (
          <div className="SlideShow__edit_image">
            <button type="button" aria-label="Edit slideshow">
              <i className="image-edit" />
            </button>
          </div>
        ) : null}
      </div>
      <div className="SlideShow__body">
        <div className="SlideShow__controls">
          <p className="SlideShow__counter">
            <span>{safeCurrentIndex + 1}</span>
            <span aria-hidden="true">|</span>
            <span>{slides.length}</span>
          </p>
          <div className="SlideShow__nav">
            <button
              type="button"
              aria-label="Previous slide"
              disabled={safeCurrentIndex === 0}
              onClick={previous}
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label="Next slide"
              disabled={safeCurrentIndex === slides.length - 1}
              onClick={next}
            >
              &rarr;
            </button>
          </div>
        </div>
        {currentSlide.caption && (
          <p className="SlideShow__caption">
            {currentSlide.caption}
          </p>
        )}
      </div>
    </div>
  )
}

export default SlideShowDisplayMode
