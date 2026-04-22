import { type FC, useEffect, useRef, type MutableRefObject } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  COMMAND_PRIORITY_HIGH,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
  type LexicalEditor,
} from 'lexical'
import { IMAGE_ADD_COMMAND } from '../command'
import type { UploadImageConfig } from '../../../../core/types/editor'

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const DEFAULT_ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml'
]

type DragDropImagePluginProps = {
  uploadImage?: UploadImageConfig
}

const DragDropImagePlugin: FC<DragDropImagePluginProps> = ({ uploadImage }) => {
  const [editor] = useLexicalComposerContext()
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!uploadImage) {
      return
    }

    return mergeRegister(
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => handleDragOver(event, uploadImage),
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand(
        DROP_COMMAND,
        (event) => handleDrop(event, uploadImage, editor, abortControllerRef),
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [editor, uploadImage])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return null
}

function handleDragOver(
  event: DragEvent,
  uploadImage: UploadImageConfig
): boolean {
  const files = Array.from(event.dataTransfer?.files ?? [])
  const allowedMimeTypes = uploadImage.allowedMimeTypes ?? DEFAULT_ALLOWED_MIME_TYPES
  const hasImageFile = files.some((file) => allowedMimeTypes.includes(file.type))

  if (!hasImageFile) {
    return false
  }

  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }

  return true
}

function handleDrop(
  event: DragEvent,
  uploadImage: UploadImageConfig,
  editor: LexicalEditor,
  abortControllerRef: MutableRefObject<AbortController | null>
): boolean {
  const files = Array.from(event.dataTransfer?.files ?? [])
  const allowedMimeTypes = uploadImage.allowedMimeTypes ?? DEFAULT_ALLOWED_MIME_TYPES
  const imageFiles = files.filter((file) => allowedMimeTypes.includes(file.type))

  if (imageFiles.length === 0) {
    return false
  }

  event.preventDefault()
  void uploadDroppedImages(imageFiles, uploadImage, editor, abortControllerRef)

  return true
}

async function uploadDroppedImages(
  imageFiles: File[],
  uploadImage: UploadImageConfig,
  editor: LexicalEditor,
  abortControllerRef: MutableRefObject<AbortController | null>
): Promise<void> {
  for (const file of imageFiles) {
    try {
      if (uploadImage.validate) {
        const validation = uploadImage.validate(file)
        if (!validation.valid) {
          const errorMsg = validation.error ?? `Invalid file: ${file.name}`
          handleUploadError(uploadImage, new Error(errorMsg))
          continue
        }
      }

      const maxFileSize = uploadImage.maxFileSize ?? DEFAULT_MAX_FILE_SIZE
      if (file.size > maxFileSize) {
        const errorMsg =
          `File size exceeds maximum of ${Math.round(maxFileSize / 1024 / 1024)}MB`
        handleUploadError(uploadImage, new Error(errorMsg))
        continue
      }

      abortControllerRef.current = new AbortController()

      const result = await uploadImage.handler(file)

      editor.dispatchCommand(IMAGE_ADD_COMMAND, {
        url: result.url,
        layout: 'default',
        caption: '',
        title: result.title || '',
        source: 'drag-drop'
      })

      abortControllerRef.current = null
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        continue
      }
      handleUploadError(uploadImage, error instanceof Error ? error : new Error('Upload failed'))
    }
  }
}

function handleUploadError(uploadImage: UploadImageConfig, error: Error): void {
  if (uploadImage.onError) {
    uploadImage.onError(error)
  } else {
    alert(`Image upload failed: ${error.message}`)
  }
}

export default DragDropImagePlugin
