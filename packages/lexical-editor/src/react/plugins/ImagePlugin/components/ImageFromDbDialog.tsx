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
import ImageLayoutOptions from './ImageLayoutOptions'
import type { ImageLayout } from '../constant'

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
  onDelete?: () => void
}

const DEFAULT_PAGE_SIZE = 12

const ImageFromDbDialog: FC<ImageFromDbDialogProps> = ({
  imageFromDb,
  initialImage,
  onConfirm,
  onClose,
  onDelete,
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
              (item) => item.url === currentSelectedImage.url
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
      title="選擇圖片"
      className="Image__db_dialog"
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
            disabled={!selectedImage || isLoading}
            onClick={confirm}
          >
            Confirm
          </PluginButton>
        </>
      }
    >
      <div className="Image__db_search">
        <PluginTextInput
          type="text"
          placeholder="請輸入圖片標題"
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
          onKeyDown={handleSearchInputKeyDown}
        />
        <PluginButton className="Image__db_search_button" onClick={search}>
          Search
        </PluginButton>
      </div>

      {errorMessage && (
        <p className="Image__db_status" role="alert">
          {errorMessage}
        </p>
      )}

      <div
        className={`Image__db_grid ${isLoading ? 'is-loading' : ''}`}
        aria-busy={isLoading}
      >
        {items.length > 0 ? (
          items.map((item) => (
            <button
              key={item.url}
              type="button"
              className={`Image__db_card ${
                selectedImage?.url === item.url ? 'is-active' : ''
              }`}
              disabled={isLoading}
              onClick={() => setSelectedImage(item)}
            >
              <img src={item.url} alt={item.title} />
              <span>{item.title}</span>
            </button>
          ))
        ) : (
          <p className="Image__db_status Image__db_status--grid">
            {isLoading ? 'Loading...' : 'No images found.'}
          </p>
        )}
        {isLoading && items.length > 0 ? (
          <div className="Image__db_loading_overlay" aria-hidden="true">
            <p className="Image__db_status">Loading...</p>
          </div>
        ) : null}
      </div>

      <div className="Image__db_pagination">
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

      <div className="Image__db_selected">
        {selectedImage ? (
          <>
            <img src={selectedImage.url} alt={selectedImage.title} />
            <div className="Image__db_selected_content">
              <PluginField label="圖說">
                <PluginTextarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  onKeyDown={handleEditorShortcutKeyDown}
                />
              </PluginField>
              <ImageLayoutOptions layout={layout} onChange={setLayout} />
            </div>
          </>
        ) : (
          <p className="Image__db_status">No image selected.</p>
        )}
      </div>
    </PluginDialog>
  )
}

export default ImageFromDbDialog
