import { type Dispatch, useCallback, useEffect, useState, type JSX } from 'react'
// lexical
import { $isHeadingNode } from '@lexical/rich-text'
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
} from '@lexical/selection'
import {
  $findMatchingParent,
  mergeRegister,
  $getNearestNodeOfType,
} from '@lexical/utils'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isListNode, ListNode } from '@lexical/list'
import {
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $isElementNode,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  type LexicalEditor,
  type LexicalNode,
} from 'lexical'
// context
import {
  blockTypeToBlockName,
  useToolbarState,
} from '../../context/ToolbarContext'
// hook
import useModal from '../../hooks/useModal'
// util
import {
  clearFormatting,
  formatHeading,
  formatParagraph,
  formatBulletList,
  formatNumberedList,
} from './utils'
import { getSelectedNode } from '../../utils/getSelectedNode'
import { sanitizeUrl } from '../../utils/url'
import { $isAnnotationNode } from '../AnnotationPlugin/nodes/AnnotationNode'
// component
import DropDown, { DropDownItem } from '../../components/DropDown'
import ImageLinkEditDialog from '../ImageLinkPlugin/components/ImageLinkEditDialog'
import { SHORTCUTS } from '../ShortcutsPlugin/shortcuts'
// custom command
import {
  ANNOTATION_ADD_COMMAND,
  ANNOTATION_REMOVE_COMMAND,
} from '../AnnotationPlugin/command'
import {
  IMAGE_LINK_ADD_COMMAND
} from '../ImageLinkPlugin/command'
// types
import type { EditorTheme } from '../../../core'

function dropDownActiveClass(active: boolean) {
  if (active) {
    return 'active dropdown-item-active'
  } else {
    return ''
  }
}

function BlockFormatDropDown({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName
  editor: LexicalEditor
  disabled?: boolean
}): JSX.Element {
  return (
    <DropDown
      disabled={disabled}
      buttonClassName="toolbar-item block-controls"
      buttonIconClassName={`icon block-type ${blockType}`}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style"
    >
      <DropDownItem
        className={`item wide ${dropDownActiveClass(blockType === 'paragraph')}`}
        onClick={() => formatParagraph(editor)}
      >
        <div className="icon-text-container">
          <i className="icon paragraph" />
          <span className="text">Normal</span>
        </div>
        <span className="shortcut">{SHORTCUTS.NORMAL}</span>
      </DropDownItem>
      <DropDownItem
        className={`item wide ${dropDownActiveClass(blockType === 'h2')}`}
        onClick={() => formatHeading(editor, blockType, 'h2')}
      >
        <div className="icon-text-container">
          <i className="icon h2" />
          <span className="text">Heading 2</span>
        </div>
        <span className="shortcut">{SHORTCUTS.HEADING2}</span>
      </DropDownItem>
      <DropDownItem
        className={`item wide ${dropDownActiveClass(blockType === 'h3')}`}
        onClick={() => formatHeading(editor, blockType, 'h3')}
      >
        <div className="icon-text-container">
          <i className="icon h3" />
          <span className="text">Heading 3</span>
        </div>
        <span className="shortcut">{SHORTCUTS.HEADING3}</span>
      </DropDownItem>
      <DropDownItem
        className={`item wide ${dropDownActiveClass(blockType === 'bullet')}`}
        onClick={() => formatBulletList(editor, blockType)}
      >
        <div className="icon-text-container">
          <i className="icon bullet-list" />
          <span className="text">Bullet List</span>
        </div>
        <span className="shortcut">{SHORTCUTS.BULLET_LIST}</span>
      </DropDownItem>
      <DropDownItem
        className={`item wide ${dropDownActiveClass(blockType === 'number')}`}
        onClick={() => formatNumberedList(editor, blockType)}
      >
        <div className="icon-text-container">
          <i className="icon numbered-list" />
          <span className="text">Numbered List</span>
        </div>
        <span className="shortcut">{SHORTCUTS.NUMBERED_LIST}</span>
      </DropDownItem>
    </DropDown>
  )
}

function Divider(): JSX.Element {
  return <div className="divider" />
}

const editorId = 'lexical-editor'
const fullscreenClassname = 'fullscreen'
function Fullscreen(): JSX.Element {
  const [isFull, setIsFull] = useState(false)
  const toggleFullscreen = () => {
    if (!document) return
    const editorElement = document.getElementById(editorId)
    if (!editorElement) return

    if (isFull) {
      editorElement.classList.remove(fullscreenClassname)
    } else {
      editorElement.classList.add(fullscreenClassname)
    }

    setIsFull(!isFull)
  }

  return (
    <div className="fullscreen" onClick={toggleFullscreen}>
      <i className={`icon ${isFull ? 'exit-fullscreen' : 'fullscreen'}`} />
    </div>
  )
}

function $findTopLevelElement(node: LexicalNode) {
  let topLevelElement =
    node.getKey() === 'root'
      ? node
      : $findMatchingParent(node, (e) => {
          const parent = e.getParent()
          return parent !== null && $isRootOrShadowRoot(parent)
        })

  if (topLevelElement === null) {
    topLevelElement = node.getTopLevelElementOrThrow()
  }
  return topLevelElement
}

export default function ToolbarPlugin({
  editor,
  activeEditor,
  config,
  setActiveEditor,
  setIsLinkEditMode,
}: {
  editor: LexicalEditor
  activeEditor: LexicalEditor
  config: EditorTheme
  setActiveEditor: Dispatch<LexicalEditor>
  setIsLinkEditMode: Dispatch<boolean>
}): JSX.Element {
  const [modal] = useModal()
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())
  const { toolbarState, updateToolbarState } = useToolbarState()

  // custom plugin state
  const [isOpenImageLinkDialog, setIsOpenImageLinkDialog] = useState(false)

  const $handleHeadingNode = useCallback(
    (selectedElement: LexicalNode) => {
      const type = $isHeadingNode(selectedElement)
        ? selectedElement.getTag()
        : selectedElement.getType()

      if (type in blockTypeToBlockName) {
        updateToolbarState(
          'blockType',
          type as keyof typeof blockTypeToBlockName
        )
      }
    },
    [updateToolbarState]
  )

  const $updateToolbarFromSelection = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent()
              return parent !== null && $isRootOrShadowRoot(parent)
            })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDOM = activeEditor.getElementByKey(elementKey)

      updateToolbarState('isRTL', $isParentElementRTL(selection))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      const isLink = $isLinkNode(parent) || $isLinkNode(node)
      updateToolbarState('isLink', isLink)

      // update annotation
      const isAnnotated = $isAnnotationNode(parent) || $isAnnotationNode(node)
      updateToolbarState('isAnnotated', isAnnotated)

      if (elementDOM !== null) {
        const type = $isHeadingNode(element)
          ? element.getTag()
          : element.getType()
        if (type in blockTypeToBlockName) {
          updateToolbarState(
            'blockType',
            type as keyof typeof blockTypeToBlockName
          )
        }
      }

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          )
          const type = parentList
            ? parentList.getListType()
            : element.getListType()

          updateToolbarState('blockType', type)
        } else {
          $handleHeadingNode(element)
        }
      }

      // Handle buttons
      updateToolbarState(
        'fontColor',
        $getSelectionStyleValueForProperty(selection, 'color', '#404040')
      )
      updateToolbarState(
        'bgColor',
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          'transparent'
        )
      )
      updateToolbarState(
        'fontFamily',
        $getSelectionStyleValueForProperty(
          selection,
          'font-family',
          'Roboto Slab", "Noto Sans TC", sans-serif'
        )
      )

      let matchingParent: LexicalNode | null
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
        )
        if (matchingParent) {
          // If matchingParent is a valid node, pass it's format type
          updateToolbarState(
            'elementFormat',
            $isElementNode(matchingParent)
              ? matchingParent.getFormatType()
              : $isElementNode(node)
                ? node.getFormatType()
                : parent?.getFormatType() || 'left'
          )
        }
      }
    }
    if ($isRangeSelection(selection)) {
      // Update text format
      updateToolbarState('isBold', selection.hasFormat('bold'))
      updateToolbarState('isItalic', selection.hasFormat('italic'))
      updateToolbarState('isUnderline', selection.hasFormat('underline'))
      updateToolbarState(
        'isStrikethrough',
        selection.hasFormat('strikethrough')
      )
      updateToolbarState('isSubscript', selection.hasFormat('subscript'))
      updateToolbarState('isSuperscript', selection.hasFormat('superscript'))
      updateToolbarState('isLowercase', selection.hasFormat('lowercase'))
      updateToolbarState('isUppercase', selection.hasFormat('uppercase'))
      updateToolbarState('isCapitalize', selection.hasFormat('capitalize'))
    }
    if ($isNodeSelection(selection)) {
      const nodes = selection.getNodes()
      for (const selectedNode of nodes) {
        const parentList = $getNearestNodeOfType<ListNode>(
          selectedNode,
          ListNode
        )
        if (parentList) {
          const type = parentList.getListType()
          updateToolbarState('blockType', type)
        } else {
          const selectedElement = $findTopLevelElement(selectedNode)
          $handleHeadingNode(selectedElement)
          // Update elementFormat for node selection (e.g., images)
          if ($isElementNode(selectedElement)) {
            updateToolbarState('elementFormat', selectedElement.getFormatType())
          }
        }
      }
    }
  }, [activeEditor, updateToolbarState, $handleHeadingNode])

  const updateToolbar = useCallback(
    (editorInstance: LexicalEditor = activeEditor) => {
      editorInstance.read(() => {
        $updateToolbarFromSelection()
      })
    },
    [activeEditor, $updateToolbarFromSelection]
  )

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor)
        updateToolbar(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, updateToolbar, setActiveEditor])

  useEffect(() => {
    updateToolbar(activeEditor)
  }, [activeEditor, updateToolbar])

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      activeEditor.registerUpdateListener(() => {
        updateToolbar(activeEditor)
      })
    )
  }, [updateToolbar, activeEditor, editor])

  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      activeEditor.update(
        () => {
          const selection = $getSelection()
          if (selection !== null) {
            $patchStyleText(selection, styles)
          }
        },
        skipHistoryStack ? { tag: 'historic' } : {}
      )
    },
    [activeEditor]
  )

  const onFontColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ color: value }, skipHistoryStack)
    },
    [applyStyleText]
  )

  const onBgColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ 'background-color': value }, skipHistoryStack)
    },
    [applyStyleText]
  )

  const insertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true)
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'))
    } else {
      setIsLinkEditMode(false)
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [activeEditor, setIsLinkEditMode, toolbarState.isLink])

  const toggleAnnotation = useCallback(() => {
    if (toolbarState.isAnnotated) {
      activeEditor.dispatchCommand(ANNOTATION_REMOVE_COMMAND, undefined)
    } else {
      activeEditor.dispatchCommand(ANNOTATION_ADD_COMMAND, undefined)
    }
  }, [activeEditor, toolbarState])

  return (
    <>
      <div className="toolbar">
        {toolbarState.blockType in blockTypeToBlockName &&
          activeEditor === editor && (
            <>
              <BlockFormatDropDown
                disabled={!isEditable}
                blockType={toolbarState.blockType}
                editor={activeEditor}
              />
              <Divider />
            </>
          )}
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
          }}
          className={`toolbar-item spaced ${toolbarState.isBold ? 'active' : ''}`}
          title={`Bold (${SHORTCUTS.BOLD})`}
          type="button"
          aria-label={`Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`}
        >
          <i className="format bold" />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
          }}
          className={`toolbar-item spaced ${toolbarState.isItalic ? 'active' : ''}`}
          title={`Italic (${SHORTCUTS.ITALIC})`}
          type="button"
          aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`}
        >
          <i className="format italic" />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
          }}
          className={`toolbar-item spaced ${toolbarState.isUnderline ? 'active' : ''}`}
          title={`Underline (${SHORTCUTS.UNDERLINE})`}
          type="button"
          aria-label={`Format text to underlined. Shortcut: ${SHORTCUTS.UNDERLINE}`}
        >
          <i className="format underline" />
        </button>
        <button
          disabled={!isEditable}
          onClick={insertLink}
          className={`toolbar-item spaced ${toolbarState.isLink ? 'active' : ''}`}
          aria-label="Insert link"
          title={`Insert link (${SHORTCUTS.INSERT_LINK})`}
          type="button"
        >
          <i className="format link" />
        </button>
        { config.components?.ColorPicker && (
          <>
            <config.components.ColorPicker
              disabled={!isEditable}
              buttonClassName="toolbar-item color-picker"
              buttonAriaLabel="Formatting text color"
              buttonIconClassName="icon font-color"
              color={toolbarState.fontColor}
              onChange={onFontColorSelect}
              title="text color"
              type="text"
            />
            <config.components.ColorPicker
              disabled={!isEditable}
              buttonClassName="toolbar-item color-picker"
              buttonAriaLabel="Formatting background color"
              buttonIconClassName="icon bg-color"
              color={toolbarState.bgColor}
              onChange={onBgColorSelect}
              title="bg color"
              type="background"
            />
          </>
        )}
        <DropDown
          disabled={!isEditable}
          buttonClassName="toolbar-item spaced"
          buttonLabel=""
          buttonAriaLabel="Formatting options for additional text styles"
          buttonIconClassName="icon dropdown-more"
        >
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase')
            }}
            className={`item wide ${dropDownActiveClass(toolbarState.isLowercase)}`}
            title="Lowercase"
            aria-label="Format text to lowercase"
          >
            <div className="icon-text-container">
              <i className="icon lowercase" />
              <span className="text">Lowercase</span>
            </div>
            <span className="shortcut">{SHORTCUTS.LOWERCASE}</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase')
            }}
            className={`item wide ${dropDownActiveClass(toolbarState.isUppercase)}`}
            title="Uppercase"
            aria-label="Format text to uppercase"
          >
            <div className="icon-text-container">
              <i className="icon uppercase" />
              <span className="text">Uppercase</span>
            </div>
            <span className="shortcut">{SHORTCUTS.UPPERCASE}</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize')
            }}
            className={`item wide ${dropDownActiveClass(toolbarState.isCapitalize)}`}
            title="Capitalize"
            aria-label="Format text to capitalize"
          >
            <div className="icon-text-container">
              <i className="icon capitalize" />
              <span className="text">Capitalize</span>
            </div>
            <span className="shortcut">{SHORTCUTS.CAPITALIZE}</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
            }}
            className={`item wide ${dropDownActiveClass(toolbarState.isStrikethrough)}`}
            title="Strikethrough"
            aria-label="Format text with a strikethrough"
          >
            <div className="icon-text-container">
              <i className="icon strikethrough" />
              <span className="text">Strikethrough</span>
            </div>
            <span className="shortcut">{SHORTCUTS.STRIKETHROUGH}</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')
            }}
            className={`item wide ${dropDownActiveClass(toolbarState.isSubscript)}`}
            title="Subscript"
            aria-label="Format text with a subscript"
          >
            <div className="icon-text-container">
              <i className="icon subscript" />
              <span className="text">Subscript</span>
            </div>
            <span className="shortcut">{SHORTCUTS.SUBSCRIPT}</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')
            }}
            className={`item wide ${dropDownActiveClass(toolbarState.isSuperscript)}`}
            title="Superscript"
            aria-label="Format text with a superscript"
          >
            <div className="icon-text-container">
              <i className="icon superscript" />
              <span className="text">Superscript</span>
            </div>
            <span className="shortcut">{SHORTCUTS.SUPERSCRIPT}</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => clearFormatting(activeEditor)}
            className="item wide"
            title="Clear text formatting"
            aria-label="Clear all text formatting"
          >
            <div className="icon-text-container">
              <i className="icon clear" />
              <span className="text">Clear Formatting</span>
            </div>
            <span className="shortcut">{SHORTCUTS.CLEAR_FORMATTING}</span>
          </DropDownItem>
        </DropDown>
        <button
          disabled={!isEditable}
          onClick={toggleAnnotation}
          className={`toolbar-item spaced ${toolbarState.isAnnotated ? 'active' : ''}`}
          aria-label="Add annotation"
          title={`Add annotation (${SHORTCUTS.ANNOTATION})`}
          type="button"
        >
          <i className="format annotation" />
        </button>
        <Divider />
        <DropDown
          disabled={!isEditable}
          buttonClassName="toolbar-item spaced"
          buttonLabel=""
          buttonAriaLabel="insert some cool compoents"
          buttonIconClassName="icon plus"
        >
          <DropDownItem
            onClick={() => {
              setIsOpenImageLinkDialog(true)
            }}
            className={`item wide`}
            title="Image Link"
            aria-label="add image link"
          >
            <div className="icon-text-container">
              <i className="icon image-link" />
              <span className="text">ImgLink</span>
            </div>
            <span className="shortcut">{SHORTCUTS.IMAGE_LINK}</span>
          </DropDownItem>
        </DropDown>
        <Divider />
        <button
          disabled={!isEditable}
          className={`toolbar-item spaced ${toolbarState.isUnderline ? 'active' : ''}`}
          type="button"
        >
          <Fullscreen />
        </button>
        {modal}
      </div>
      {isOpenImageLinkDialog &&
        <ImageLinkEditDialog
          imageLayout="default"
          imageUrl=""
          imageCaption=""
          onClose={() => setIsOpenImageLinkDialog(false)}
          onConfirm={(url, layout, caption) => activeEditor.dispatchCommand(IMAGE_LINK_ADD_COMMAND, { url, layout, caption })}
        />}
    </>
  )
}
