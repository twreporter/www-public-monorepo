import {
  type FC,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { ImageFromDbConfig, ImageFromDbItem } from '../../../../core'
import {
  PluginButton,
  PluginDialog,
  PluginField,
  PluginTextInput,
  PluginTextarea,
} from '../../../components/PluginUI'
import type { SlideShowSlide } from '../types'
import { normalizeSlideShowSlides } from '../utils'

type SelectedSlide = SlideShowSlide & {
  title: string
}

type SlideShowEditDialogProps = {
  imageFromDb: ImageFromDbConfig
  initialSlides?: SlideShowSlide[]
  onClose: () => void
  onConfirm: (slides: SlideShowSlide[]) => void
  onDelete?: () => void
}

const DEFAULT_PAGE_SIZE = 12

const SlideShowEditDialog: FC<SlideShowEditDialogProps> = ({
  imageFromDb,
  initialSlides = [],
  onClose,
  onConfirm,
  onDelete,
}) => {
  const pageSize = imageFromDb.pageSize ?? DEFAULT_PAGE_SIZE
  const [inputKeyword, setInputKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<ImageFromDbItem[]>([])
  const [total, setTotal] = useState(0)
  const [selectedSlides, setSelectedSlides] = useState<SelectedSlide[]>(
    initialSlides.map((slide) => ({
      ...slide,
      title: '',
    }))
  )
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const pageNumbers = useMemo(() => {
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, start + 4)
    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }, [page, totalPages])

  useEffect(() => {
    const abortController = new AbortController()

    setIsLoading(true)
    setErrorMessage('')

    void imageFromDb
      .search({
        keyword,
        page,
        pageSize,
        signal: abortController.signal,
      })
      .then(({ items: nextItems, total: nextTotal }) => {
        if (abortController.signal.aborted) {
          return
        }

        setItems(nextItems)
        setTotal(nextTotal)
        setSelectedSlides((currentSlides) =>
          currentSlides.map((slide) => {
            const matchedItem = nextItems.find((item) => item.url === slide.url)
            return matchedItem ? { ...slide, title: matchedItem.title } : slide
          })
        )
      })
      .catch((error) => {
        if (abortController.signal.aborted) {
          return
        }

        const nextError =
          error instanceof Error ? error : new Error('Image search failed')
        imageFromDb.onError?.(nextError)
        setErrorMessage(nextError.message)
        setItems([])
        setTotal(0)
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => {
      abortController.abort()
    }
  }, [imageFromDb, keyword, page, pageSize])

  const search = () => {
    setKeyword(inputKeyword.trim())
    setPage(1)
  }

  const isSelected = (url: string) =>
    selectedSlides.some((slide) => slide.url === url)

  const toggleImage = (item: ImageFromDbItem) => {
    setSelectedSlides((currentSlides) => {
      if (currentSlides.some((slide) => slide.url === item.url)) {
        return currentSlides.filter((slide) => slide.url !== item.url)
      }

      return [
        ...currentSlides,
        {
          url: item.url,
          caption: '',
          title: item.title,
        },
      ]
    })
  }

  const updateCaption = (url: string, caption: string) => {
    setSelectedSlides((currentSlides) =>
      currentSlides.map((slide) =>
        slide.url === url ? { ...slide, caption } : slide
      )
    )
  }

  const removeSlide = (url: string) => {
    setSelectedSlides((currentSlides) =>
      currentSlides.filter((slide) => slide.url !== url)
    )
  }

  const moveSlide = (url: string, direction: -1 | 1) => {
    setSelectedSlides((currentSlides) => {
      const currentIndex = currentSlides.findIndex((slide) => slide.url === url)
      const nextIndex = currentIndex + direction

      if (
        currentIndex === -1 ||
        nextIndex < 0 ||
        nextIndex >= currentSlides.length
      ) {
        return currentSlides
      }

      const nextSlides = [...currentSlides]
      const [slide] = nextSlides.splice(currentIndex, 1)
      if (!slide) {
        return currentSlides
      }
      nextSlides.splice(nextIndex, 0, slide)
      return nextSlides
    })
  }

  const confirm = () => {
    const slides = normalizeSlideShowSlides(selectedSlides)

    if (slides.length === 0) {
      alert('請至少選擇一張圖片。')
      return
    }

    onConfirm(slides)
    onClose()
  }

  const deleteNode = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (typeof onDelete === 'function') {
      onDelete()
    }
  }

  const handleEditorShortcutKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') {
      e.stopPropagation()
    }
  }

  const handleSearchInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    handleEditorShortcutKeyDown(e)

    if (e.key === 'Enter') {
      e.preventDefault()
      search()
    }
  }

  return (
    <PluginDialog
      title="編輯輪播"
      className="SlideShow__edit_dialog"
      actions={
        <>
          {onDelete && (
            <PluginButton variant="danger" onClick={deleteNode}>
              Delete
            </PluginButton>
          )}
          <PluginButton onClick={onClose}>Cancel</PluginButton>
          <PluginButton
            variant="primary"
            disabled={selectedSlides.length === 0 || isLoading}
            onClick={confirm}
          >
            Confirm
          </PluginButton>
        </>
      }
    >
      <div className="SlideShow__db_search">
        <PluginTextInput
          type="text"
          placeholder="請輸入圖片標題"
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
          onKeyDown={handleSearchInputKeyDown}
        />
        <PluginButton
          className="SlideShow__db_search_button"
          onClick={search}
        >
          Search
        </PluginButton>
      </div>

      {errorMessage && (
        <p className="SlideShow__db_status" role="alert">
          {errorMessage}
        </p>
      )}

      <div
        className={`SlideShow__db_grid ${isLoading ? 'is-loading' : ''}`}
        aria-busy={isLoading}
      >
        {items.length > 0 ? (
          items.map((item) => (
            <button
              key={item.url}
              type="button"
              className={`SlideShow__db_card ${
                isSelected(item.url) ? 'is-active' : ''
              }`}
              disabled={isLoading}
              onClick={() => toggleImage(item)}
            >
              <img src={item.url} alt={item.title} />
              <span>{item.title}</span>
            </button>
          ))
        ) : (
          <p className="SlideShow__db_status SlideShow__db_status--grid">
            {isLoading ? 'Loading...' : 'No images found.'}
          </p>
        )}
        {isLoading && items.length > 0 ? (
          <div className="SlideShow__db_loading_overlay" aria-hidden="true">
            <p className="SlideShow__db_status">Loading...</p>
          </div>
        ) : null}
      </div>

      <div className="SlideShow__db_pagination">
        {page > 1 && (
          <button
            type="button"
            aria-label="Previous page"
            disabled={isLoading}
            onClick={() =>
              setPage((currentPage) => Math.max(1, currentPage - 1))
            }
          >
            &lt;
          </button>
        )}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={pageNumber === page ? 'is-active' : ''}
            disabled={isLoading}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {page < totalPages && (
          <button
            type="button"
            aria-label="Next page"
            disabled={isLoading}
            onClick={() =>
              setPage((currentPage) => Math.min(totalPages, currentPage + 1))
            }
          >
            &gt;
          </button>
        )}
      </div>

      <PluginField label="已選圖片" className="SlideShow__selected_field">
        <div className="SlideShow__selected">
          {selectedSlides.length > 0 ? (
            selectedSlides.map((slide, index) => (
              <div className="SlideShow__selected_card" key={slide.url}>
                <div className="SlideShow__selected_media">
                  <img src={slide.url} alt={slide.caption || slide.title} />
                  <button
                    type="button"
                    className="SlideShow__selected_remove"
                    aria-label="Remove slide"
                    onClick={() => removeSlide(slide.url)}
                  >
                    &times;
                  </button>
                </div>
                <div className="SlideShow__selected_order">
                  <span>{index + 1}</span>
                  <button
                    type="button"
                    disabled={index === 0}
                    aria-label="Move slide left"
                    onClick={() => moveSlide(slide.url, -1)}
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    disabled={index === selectedSlides.length - 1}
                    aria-label="Move slide right"
                    onClick={() => moveSlide(slide.url, 1)}
                  >
                    &rarr;
                  </button>
                </div>
                <PluginTextarea
                  value={slide.caption}
                  placeholder="請輸入圖說"
                  onChange={(e) => updateCaption(slide.url, e.target.value)}
                  onKeyDown={handleEditorShortcutKeyDown}
                />
              </div>
            ))
          ) : (
            <p className="SlideShow__db_status">No image selected.</p>
          )}
        </div>
      </PluginField>
    </PluginDialog>
  )
}

export default SlideShowEditDialog
