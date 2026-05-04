import { type FC, useEffect, useRef, type MutableRefObject } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $getNodeByKey,
  COMMAND_PRIORITY_HIGH,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
  type LexicalEditor,
} from 'lexical'
import { IMAGE_ADD_COMMAND } from '../command'
import { $isImageContentNode, ImageContentNode } from '../nodes/ImageContentNode'
import { $isImageNode, ImageNode } from '../nodes/ImageNode'
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
  const loadingNodeKeysRef = useRef<string[]>([])

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
        (event) => handleDrop(
          event,
          uploadImage,
          editor,
          abortControllerRef,
          loadingNodeKeysRef
        ),
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [editor, uploadImage])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      removeImageSkeletons(editor, loadingNodeKeysRef.current)
      loadingNodeKeysRef.current = []
    }
  }, [editor])

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
  abortControllerRef: MutableRefObject<AbortController | null>,
  loadingNodeKeysRef: MutableRefObject<string[]>
): boolean {
  const files = Array.from(event.dataTransfer?.files ?? [])
  const allowedMimeTypes = uploadImage.allowedMimeTypes ?? DEFAULT_ALLOWED_MIME_TYPES
  const imageFiles = files.filter((file) => allowedMimeTypes.includes(file.type))

  if (imageFiles.length === 0) {
    return false
  }

  event.preventDefault()
  abortControllerRef.current?.abort()
  removeImageSkeletons(editor, loadingNodeKeysRef.current)
  loadingNodeKeysRef.current = []

  const abortController = new AbortController()
  abortControllerRef.current = abortController
  const loadingNodeKeys = insertImageSkeletons(imageFiles.length)
  loadingNodeKeysRef.current = loadingNodeKeys

  void uploadDroppedImages(
    imageFiles,
    loadingNodeKeys,
    uploadImage,
    editor,
    abortControllerRef,
    loadingNodeKeysRef,
    abortController
  )

  return true
}

async function uploadDroppedImages(
  imageFiles: File[],
  loadingNodeKeys: Array<string | null>,
  uploadImage: UploadImageConfig,
  editor: LexicalEditor,
  abortControllerRef: MutableRefObject<AbortController | null>,
  loadingNodeKeysRef: MutableRefObject<string[]>,
  abortController: AbortController
): Promise<void> {
  const { signal } = abortController

  try {
    for (const [index, file] of imageFiles.entries()) {
      if (signal.aborted) {
        break
      }

      const loadingNodeKey = loadingNodeKeys[index] ?? null

      try {
        if (uploadImage.validate) {
          const validation = uploadImage.validate(file)
          if (!validation.valid) {
            const errorMsg = validation.error ?? `Invalid file: ${file.name}`
            handleUploadError(uploadImage, new Error(errorMsg))
            removeImageSkeleton(editor, loadingNodeKey)
            removePendingImageSkeletonKey(loadingNodeKeysRef, loadingNodeKey)
            continue
          }
        }

        const maxFileSize = uploadImage.maxFileSize ?? DEFAULT_MAX_FILE_SIZE
        if (file.size > maxFileSize) {
          const errorMsg =
            `File size exceeds maximum of ${Math.round(maxFileSize / 1024 / 1024)}MB`
          handleUploadError(uploadImage, new Error(errorMsg))
          removeImageSkeleton(editor, loadingNodeKey)
          removePendingImageSkeletonKey(loadingNodeKeysRef, loadingNodeKey)
          continue
        }

        const result = await uploadImage.handler(file, signal)

        if (signal.aborted) {
          removeImageSkeleton(editor, loadingNodeKey)
          removePendingImageSkeletonKey(loadingNodeKeysRef, loadingNodeKey)
          break
        }

        replaceImageSkeleton(editor, loadingNodeKey, result)
        removePendingImageSkeletonKey(loadingNodeKeysRef, loadingNodeKey)
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          removeImageSkeleton(editor, loadingNodeKey)
          removePendingImageSkeletonKey(loadingNodeKeysRef, loadingNodeKey)
          break
        }
        removeImageSkeleton(editor, loadingNodeKey)
        removePendingImageSkeletonKey(loadingNodeKeysRef, loadingNodeKey)
        handleUploadError(
          uploadImage,
          error instanceof Error ? error : new Error('Upload failed')
        )
      }
    }
  } finally {
    if (abortControllerRef.current === abortController) {
      abortControllerRef.current = null
    }
  }
}

function insertImageSkeletons(count: number): string[] {
  const selection = $getSelection()
  if (!selection) {
    return []
  }

  const loadingNodeKeys: string[] = []
  const imageNodes = Array.from({ length: count }, () => {
    const imageNode = new ImageNode()
    const imageContentNode = new ImageContentNode(
      '',
      'default',
      '',
      '',
      'drag-drop',
      true
    )

    imageNode.append(imageContentNode)
    loadingNodeKeys.push(imageContentNode.getKey())

    return imageNode
  })

  selection.insertNodes(imageNodes)

  return loadingNodeKeys
}

function replaceImageSkeleton(
  editor: LexicalEditor,
  loadingNodeKey: string | null,
  result: { url: string; title?: string }
): void {
  if (!loadingNodeKey) {
    editor.dispatchCommand(IMAGE_ADD_COMMAND, {
      url: result.url,
      layout: 'default',
      caption: '',
      title: result.title || '',
      source: 'drag-drop'
    })
    return
  }

  editor.update(() => {
    const node = $getNodeByKey(loadingNodeKey)
    if (!$isImageContentNode(node)) {
      return
    }

    const writable = node.getWritable()
    writable.__imageUrl = result.url
    writable.__imageTitle = result.title || ''
    writable.__imageSource = 'drag-drop'
    writable.__isLoading = false
  })
}

function removeImageSkeleton(
  editor: LexicalEditor,
  loadingNodeKey: string | null
): void {
  if (!loadingNodeKey) {
    return
  }

  editor.update(() => {
    const node = $getNodeByKey(loadingNodeKey)
    if (!$isImageContentNode(node)) {
      return
    }

    const parent = node.getParent()
    if ($isImageNode(parent)) {
      parent.remove()
    } else {
      node.remove()
    }
  })
}

function removeImageSkeletons(
  editor: LexicalEditor,
  loadingNodeKeys: string[]
): void {
  loadingNodeKeys.forEach((loadingNodeKey) => {
    removeImageSkeleton(editor, loadingNodeKey)
  })
}

function removePendingImageSkeletonKey(
  loadingNodeKeysRef: MutableRefObject<string[]>,
  loadingNodeKey: string | null
): void {
  if (!loadingNodeKey) {
    return
  }

  loadingNodeKeysRef.current = loadingNodeKeysRef.current.filter(
    (nodeKey) => nodeKey !== loadingNodeKey
  )
}

function handleUploadError(uploadImage: UploadImageConfig, error: Error): void {
  if (uploadImage.onError) {
    uploadImage.onError(error)
  } else {
    console.error(`Image upload failed: ${error.message}`)
  }
}

export default DragDropImagePlugin
