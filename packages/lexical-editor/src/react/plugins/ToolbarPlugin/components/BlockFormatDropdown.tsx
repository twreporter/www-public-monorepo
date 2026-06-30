import type { JSX } from 'react'
// lexical
import type { LexicalEditor } from 'lexical'
// context
import { blockTypeToBlockName } from '../../../context/ToolbarContext'
// util
import {
  formatHeading,
  formatParagraph,
  formatBulletList,
  formatNumberedList,
} from '../utils'
// component
import DropDown, { DropDownItem } from '../../../components/DropDown'
import { SHORTCUTS } from '../../ShortcutsPlugin/shortcuts'

export function dropDownActiveClass(active: boolean) {
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
  enableH4,
}: {
  blockType: keyof typeof blockTypeToBlockName
  editor: LexicalEditor
  disabled?: boolean
  enableH4: boolean
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
      {enableH4 ? (
        <DropDownItem
          className={`item wide ${dropDownActiveClass(blockType === 'h4')}`}
          onClick={() => formatHeading(editor, blockType, 'h4')}
        >
          <div className="icon-text-container">
            <i className="icon h4" />
            <span className="text">Heading 4</span>
          </div>
          <span className="shortcut">{SHORTCUTS.HEADING4}</span>
        </DropDownItem>
      ) : null}
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

export default BlockFormatDropDown
