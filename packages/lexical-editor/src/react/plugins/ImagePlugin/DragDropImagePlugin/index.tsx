import { type FC, useEffect, useRef, type MutableRefObject } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $createRangeSelection,
  $getNearestNodeFromDOMNode,
  $getNodeByKey,
  $getRoot,
  $isElementNode,
  $isTextNode,
  $normalizeSelection__EXPERIMENTAL,
  $setSelection,
  COMMAND_PRIORITY_HIGH,
  DRAGOVER_COMMAND,
  DROP_COMMAND,
  type LexicalEditor,
  type LexicalNode,
} from 'lexical'
import {
  $createImageNode,
  $isImageNode,
  type ImageNode
} from '../nodes/ImageNode'
import { $insertImageNodes } from '../utils'
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
  let loadingNodeKeys: string[] = []
  editor.update(() => {
    setDropSelection(event)
    loadingNodeKeys = insertImageSkeletons(imageFiles.length)
  })
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

      const loadingNodeKey = getPendingImageSkeletonKey(
        loadingNodeKeys,
        loadingNodeKeysRef,
        index
      )

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

        const replacedLoadingNodeKey = replaceImageSkeleton(
          editor,
          loadingNodeKey,
          result
        )
        removePendingImageSkeletonKey(
          loadingNodeKeysRef,
          replacedLoadingNodeKey
        )
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
  const loadingNodeKeys: string[] = []
  const imageNodes = Array.from({ length: count }, () => {
    const imageNode = $createImageNode(
      '',
      'default',
      '',
      '',
      'drag-drop',
      true
    )

    loadingNodeKeys.push(imageNode.getKey())

    return imageNode
  })

  $insertImageNodes(imageNodes)

  return loadingNodeKeys
}

function getPendingImageSkeletonKey(
  loadingNodeKeys: Array<string | null>,
  loadingNodeKeysRef: MutableRefObject<string[]>,
  index: number
): string | null {
  return loadingNodeKeys[index] ?? loadingNodeKeysRef.current[0] ?? null
}

function setDropSelection(event: DragEvent): void {
  const eventRange = getEventRange(event.clientX, event.clientY)
  if (!eventRange) {
    return
  }

  const lexicalNode = $getNearestNodeFromDOMNode(eventRange.node)
  if (!lexicalNode) {
    return
  }

  const selection = $createRangeSelection()
  if ($isTextNode(lexicalNode)) {
    selection.anchor.set(lexicalNode.getKey(), eventRange.offset, 'text')
    selection.focus.set(lexicalNode.getKey(), eventRange.offset, 'text')
  } else {
    const parent = lexicalNode.getParentOrThrow()
    const offset = lexicalNode.getIndexWithinParent() + 1
    selection.anchor.set(parent.getKey(), offset, 'element')
    selection.focus.set(parent.getKey(), offset, 'element')
  }

  $setSelection($normalizeSelection__EXPERIMENTAL(selection))
}

function getEventRange(
  x: number,
  y: number
): { node: Node; offset: number } | null {
  if (typeof document.caretRangeFromPoint !== 'undefined') {
    const range = document.caretRangeFromPoint(x, y)
    return range
      ? {
          node: range.startContainer,
          offset: range.startOffset
        }
      : null
  }

  if (typeof document.caretPositionFromPoint !== 'undefined') {
    const range = document.caretPositionFromPoint(x, y)
    return range
      ? {
          node: range.offsetNode,
          offset: range.offset
        }
      : null
  }

  return null
}

function replaceImageSkeleton(
  editor: LexicalEditor,
  loadingNodeKey: string | null,
  result: { url: string; title?: string }
): string | null {
  let replacedLoadingNodeKey: string | null = null

  editor.update(() => {
    const node = $getImageSkeletonNode(loadingNodeKey)
    if (!node) {
      $insertImageNodes([$createUploadedImageNode(result)])
      return
    }

    replacedLoadingNodeKey = node.getKey()

    node.replace($createUploadedImageNode(result))
  })

  return replacedLoadingNodeKey
}

function $getImageSkeletonNode(
  loadingNodeKey: string | null
): ImageNode | null {
  if (loadingNodeKey) {
    const node = $getNodeByKey(loadingNodeKey)
    if ($isImageNode(node)) {
      return node
    }
  }

  return $findPendingImageSkeletonNode()
}

function $findPendingImageSkeletonNode(): ImageNode | null {
  const pendingNodes = $findPendingImageSkeletonNodes($getRoot())
  return pendingNodes[0] ?? null
}

function $findPendingImageSkeletonNodes(node: LexicalNode): ImageNode[] {
  if ($isImageNode(node)) {
    return node.isLoading() ? [node] : []
  }

  if (!$isElementNode(node)) {
    return []
  }

  return node.getChildren().flatMap((childNode) =>
    $findPendingImageSkeletonNodes(childNode)
  )
}

function $createUploadedImageNode(result: {
  url: string
  title?: string
}) {
  return $createImageNode(
    result.url,
    'default',
    '',
    result.title || '',
    'drag-drop'
  )
}

function removeImageSkeleton(
  editor: LexicalEditor,
  loadingNodeKey: string | null
): void {
  if (!loadingNodeKey) {
    return
  }

  editor.update(() => {
    $removeImageSkeletonByKey(loadingNodeKey)
  })
}

function removeImageSkeletons(
  editor: LexicalEditor,
  loadingNodeKeys: string[]
): void {
  if (loadingNodeKeys.length === 0) {
    return
  }

  editor.update(() => {
    loadingNodeKeys.forEach((loadingNodeKey) => {
      $removeImageSkeletonByKey(loadingNodeKey)
    })
  })
}

function $removeImageSkeletonByKey(loadingNodeKey: string): void {
  const node = $getNodeByKey(loadingNodeKey)
  if (!$isImageNode(node)) {
    return
  }

  node.remove()
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
