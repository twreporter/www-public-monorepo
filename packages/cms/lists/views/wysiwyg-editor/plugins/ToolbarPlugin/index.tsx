import styled from '@emotion/styled'
import { $isHeadingNode } from '@lexical/rich-text'
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
} from '@lexical/selection'
import { $findMatchingParent, mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  type LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import * as React from 'react'
import { type Dispatch, useCallback, useEffect, useState } from 'react'

import {
  blockTypeToBlockName,
  useToolbarState,
} from '../../context/ToolbarContext'
import useModal from '../../hooks/useModal'
import DropDown, { DropDownItem } from '../../ui/DropDown'
import DropdownColorPicker from '../../ui/DropdownColorPicker'
import { SHORTCUTS } from '../ShortcutsPlugin/shortcuts'
import { clearFormatting, formatHeading, formatParagraph } from './utils'

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
    </DropDown>
  )
}

function Divider(): JSX.Element {
  return <div className="divider" />
}

const FullscreenBox = styled.div`
  .color-picker-reset-color {
    text-align: center;
    background-color: #eff3f6;
    border-radius: 5px;
    margin-top: 8px;
    padding: 4px 0;
    color: #6b7280;
  }
`

function Fullscreen(): JSX.Element {
  const [isFull, setIsFull] = useState(false)
  const toggleFullscreen = () => {
    setIsFull(!isFull)
  }

  return (
    <FullscreenBox className="fullscreen" onClick={toggleFullscreen}>
      <i className={`icon ${isFull ? 'exit-fullscreen' : 'fullscreen'}`} />
    </FullscreenBox>
  )
}

export default function ToolbarPlugin({
  editor,
  activeEditor,
  setActiveEditor,
}: {
  editor: LexicalEditor
  activeEditor: LexicalEditor
  setActiveEditor: Dispatch<LexicalEditor>
}): JSX.Element {
  const [modal] = useModal()
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())
  const { toolbarState, updateToolbarState } = useToolbarState()

  const $updateToolbar = useCallback(() => {
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
  }, [activeEditor, updateToolbarState])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor)
        $updateToolbar()
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, $updateToolbar, setActiveEditor])

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar()
    })
  }, [activeEditor, $updateToolbar])

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      })
    )
  }, [$updateToolbar, activeEditor, editor])

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

  return (
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
      <DropdownColorPicker
        disabled={!isEditable}
        buttonClassName="toolbar-item color-picker"
        buttonAriaLabel="Formatting text color"
        buttonIconClassName="icon font-color"
        color={toolbarState.fontColor}
        onChange={onFontColorSelect}
        title="text color"
        type="text"
      />
      <DropdownColorPicker
        disabled={!isEditable}
        buttonClassName="toolbar-item color-picker"
        buttonAriaLabel="Formatting background color"
        buttonIconClassName="icon bg-color"
        color={toolbarState.bgColor}
        onChange={onBgColorSelect}
        title="bg color"
        type="background"
      />
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
  )
}
