import { type FC, useState } from 'react'

import { useImageConfig } from '../../../context/ImageConfigContext'
import type { SlideShowSlide } from '../types'

type SlideDirection = 'previous' | 'next'

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
  const [slideDirection, setSlideDirection] = useState<SlideDirection | null>(
    null
  )
  const [animationKey, setAnimationKey] = useState(0)
  const safeCurrentIndex = Math.min(
    currentIndex,
    Math.max(slides.length - 1, 0)
  )
  const currentSlide = slides[safeCurrentIndex]
  const rawSrcSet = currentSlide
    ? imageConfig?.getDbImageSrcSet?.(currentSlide.url)
    : undefined
  const srcSet = rawSrcSet?.trim() ? rawSrcSet : undefined

  if (!currentSlide) {
    return null
  }

  const previousSlide =
    slides[(safeCurrentIndex - 1 + slides.length) % slides.length]
  const nextSlide = slides[(safeCurrentIndex + 1) % slides.length]

  const previous = () => {
    setSlideDirection('previous')
    setAnimationKey((key) => key + 1)
    setCurrentIndex((index) => (index - 1 + slides.length) % slides.length)
  }

  const next = () => {
    setSlideDirection('next')
    setAnimationKey((key) => key + 1)
    setCurrentIndex((index) => (index + 1) % slides.length)
  }

  return (
    <div className="SlideShow__container">
      <div className={`SlideShow__media ${editable ? 'is-editable' : ''}`}>
        {editable ? (
          <button
            type="button"
            className="SlideShow__edit_target"
            aria-label="Edit slideshow"
            onClick={onEdit}
          />
        ) : null}
        <div className="SlideShow__peek" aria-hidden="true">
          {previousSlide ? (
            <img
              src={previousSlide.url}
              alt=""
              className="SlideShow__peek_image"
            />
          ) : null}
        </div>
        <figure
          key={`${animationKey}-${currentSlide.url}`}
          className={`SlideShow__current ${
            slideDirection ? `is-${slideDirection}` : ''
          }`}
          itemScope
          itemType="http://schema.org/ImageObject"
        >
          <img
            src={currentSlide.url}
            srcSet={srcSet}
            alt={currentSlide.caption}
            aria-label={currentSlide.caption}
            className="SlideShow__image"
          />
        </figure>
        <div className="SlideShow__peek" aria-hidden="true">
          {nextSlide ? (
            <img src={nextSlide.url} alt="" className="SlideShow__peek_image" />
          ) : null}
        </div>
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
              onClick={previous}
            >
              <i className="slide-prev" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
            >
              <i className="slide-next" />
            </button>
          </div>
        </div>
        {currentSlide.caption && (
          <p className="SlideShow__caption">{currentSlide.caption}</p>
        )}
      </div>
    </div>
  )
}

export default SlideShowDisplayMode
