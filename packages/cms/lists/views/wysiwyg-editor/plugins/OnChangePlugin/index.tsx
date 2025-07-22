import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import type { EditorState, LexicalEditor } from 'lexical'
import useLayoutEffect from '../../utils/useLayoutEffect'

export function OnChangePlugin({
  ignoreHistoryMergeTagChange = true,
  ignoreSelectionChange = false,
  initialEditorState = '',
  onChange,
}: {
  ignoreHistoryMergeTagChange?: boolean
  ignoreSelectionChange?: boolean
  initialEditorState?: string
  onChange: (
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>
  ) => void
}): null {
  const [editor] = useLexicalComposerContext()

  useLayoutEffect(() => {
    if (initialEditorState && editor) {
      editor.update(() => {
        const parsedState = editor.parseEditorState(initialEditorState)
        editor.setEditorState(parsedState)
      })
    }
  }, [initialEditorState, editor])

  useLayoutEffect(() => {
    if (onChange) {
      return editor.registerUpdateListener(
        ({
          editorState,
          dirtyElements,
          dirtyLeaves,
          prevEditorState,
          tags,
        }) => {
          if (
            (ignoreSelectionChange &&
              dirtyElements.size === 0 &&
              dirtyLeaves.size === 0) ||
            (ignoreHistoryMergeTagChange && tags.has('history-merge')) ||
            prevEditorState.isEmpty()
          ) {
            return
          }

          onChange(editorState, editor, tags)
        }
      )
    }
  }, [editor, ignoreHistoryMergeTagChange, ignoreSelectionChange, onChange])

  return null
}
