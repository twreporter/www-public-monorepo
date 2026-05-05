import {
  type FC,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ImageFromDbConfig, ImageFromDbItem } from '../../../../core'
import type { ImageLayout } from '../types'

type ImageFromDbDialogProps = {
  imageFromDb: ImageFromDbConfig
  initialImage?: ImageFromDbItem & {
    caption?: string
    layout: ImageLayout
  }
  onConfirm: (image: {
    caption: string
    url: string
    layout: ImageLayout
    title: string
  }) => void
  onClose: () => void
}

const DEFAULT_PAGE_SIZE = 12

const ImageFromDbDialog: FC<ImageFromDbDialogProps> = ({
  imageFromDb,
  initialImage,
  onConfirm,
  onClose,
}) => {
  const pageSize = imageFromDb.pageSize ?? DEFAULT_PAGE_SIZE
  const [inputKeyword, setInputKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<ImageFromDbItem[]>([])
  const [total, setTotal] = useState(0)
  const [selectedImage, setSelectedImage] = useState<ImageFromDbItem | null>(
    initialImage ?? null
  )
  const [layout, setLayout] = useState<ImageLayout>(
    initialImage?.layout ?? 'default'
  )
  const [caption, setCaption] = useState(initialImage?.caption ?? '')
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
        setSelectedImage((currentSelectedImage) => {
          if (currentSelectedImage) {
            const matchedImage = nextItems.find(
              (item) =>
                item.id === currentSelectedImage.id ||
                item.url === currentSelectedImage.url
            )

            return matchedImage ?? currentSelectedImage
          }

          return nextItems[0] ?? null
        })
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
        setSelectedImage(null)
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

  const confirm = () => {
    if (!selectedImage) {
      return
    }

    onConfirm({
      caption,
      url: selectedImage.url,
      layout,
      title: selectedImage.title,
    })
    onClose()
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') {
      e.stopPropagation()
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      search()
    }
  }

  return (
    <div
      className="Image__edit_dialog Image__db_dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="dialog-header">
        <p className="title">選擇圖片</p>
        <div className="button-set">
          <button type="button" className="button-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="button-confirm"
            disabled={!selectedImage}
            onClick={confirm}
          >
            Confirm
          </button>
        </div>
      </div>
      <div className="dialog-content">
        <div className="Image__db_search">
          <input
            type="text"
            placeholder="請輸入圖片標題"
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <button type="button" className="button-search" onClick={search}>
            Search
          </button>
        </div>

        {errorMessage && (
          <p className="Image__db_status" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="Image__db_grid" aria-busy={isLoading}>
          {isLoading ? (
            <p className="Image__db_status">Loading...</p>
          ) : items.length > 0 ? (
            items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`Image__db_card ${
                  selectedImage?.id === item.id || selectedImage?.url === item.url
                    ? 'is-active'
                    : ''
                }`}
                onClick={() => setSelectedImage(item)}
              >
                <img src={item.url} alt={item.title} />
                <span>{item.title}</span>
              </button>
            ))
          ) : (
            <p className="Image__db_status">No images found.</p>
          )}
        </div>

        <div className="Image__db_pagination">
          <button
            type="button"
            disabled={page === 1 || isLoading}
            onClick={() =>
              setPage((currentPage) => Math.max(1, currentPage - 1))
            }
          >
            ...
          </button>
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
          <button
            type="button"
            disabled={page === totalPages || isLoading}
            onClick={() =>
              setPage((currentPage) => Math.min(totalPages, currentPage + 1))
            }
          >
            ...
          </button>
        </div>

        <div className="Image__db_selected">
          {selectedImage ? (
            <>
              <img src={selectedImage.url} alt={selectedImage.title} />
              <div className="Image__db_selected_content">
                <div className="edit-item">
                  <p className="item-title">圖說</p>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="layout-option">
                  <button
                    type="button"
                    className={`button-layout ${
                      layout === 'default' ? 'is-active' : ''
                    }`}
                    onClick={() => setLayout('default')}
                  >
                    <i className="image-layout-default" />
                    <p>default</p>
                  </button>
                  <button
                    type="button"
                    className={`button-layout ${
                      layout === 'small' ? 'is-active' : ''
                    }`}
                    onClick={() => setLayout('small')}
                  >
                    <i className="image-layout-small" />
                    <p>small</p>
                  </button>
                  <button
                    type="button"
                    className={`button-layout ${
                      layout === 'right' ? 'is-active' : ''
                    }`}
                    onClick={() => setLayout('right')}
                  >
                    <i className="image-layout-right" />
                    <p>right</p>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="Image__db_status">No image selected.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageFromDbDialog
