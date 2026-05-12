import { type FC, type KeyboardEvent, type MouseEvent, useState } from 'react'

import {
  PluginButton,
  PluginDialog,
  PluginField,
  PluginTextInput,
  PluginTextarea,
} from '../../../components/PluginUI'
import type { EmbeddedCodeLayout } from '../types'
import EmbeddedCodeLayoutOptions from './EmbeddedCodeLayoutOptions'

const riskyUrlPattern = /^\s*(javascript|data:text\/html)/i
const allowlistedScriptHostnames = ['projects.twreporter.org']

function isAllowlistedScriptUrl(url: string): boolean {
  try {
    return allowlistedScriptHostnames.includes(new URL(url).hostname)
  } catch {
    return false
  }
}

function mayContainRiskyScript(embeddedCode: string): boolean {
  const template = document.createElement('template')
  template.innerHTML = embeddedCode

  const scriptElements = Array.from(template.content.querySelectorAll('script'))
  const hasRiskyScript = scriptElements.some((scriptElement) => {
    const scriptSrc = scriptElement.getAttribute('src')
    return !scriptSrc || !isAllowlistedScriptUrl(scriptSrc)
  })

  if (hasRiskyScript) {
    return true
  }

  const elements = Array.from(template.content.querySelectorAll('*'))
  return elements.some((element) => {
    return Array.from(element.attributes).some((attribute) => {
      const attributeName = attribute.name.toLowerCase()
      const attributeValue = attribute.value

      return (
        attributeName.startsWith('on') ||
        (['href', 'src', 'xlink:href'].includes(attributeName) &&
          riskyUrlPattern.test(attributeValue)) ||
        attributeName === 'srcdoc'
      )
    })
  })
}

type EmbeddedCodeEditDialogProps = {
  embeddedCode: string
  caption?: string
  layout: EmbeddedCodeLayout
  onConfirm: (
    embeddedCode: string,
    layout: EmbeddedCodeLayout,
    caption: string
  ) => void
  onClose: () => void
  onDelete?: () => void
}

const EmbeddedCodeEditDialog: FC<EmbeddedCodeEditDialogProps> = ({
  embeddedCode,
  caption = '',
  layout,
  onConfirm,
  onClose,
  onDelete,
}) => {
  const [currentEmbeddedCode, setCurrentEmbeddedCode] = useState(embeddedCode)
  const [currentCaption, setCurrentCaption] = useState(caption)
  const [currentLayout, setCurrentLayout] = useState(layout)

  const cancel = () => {
    onClose()
  }

  const confirm = () => {
    const trimmedEmbeddedCode = currentEmbeddedCode.trim()

    if (!trimmedEmbeddedCode) {
      alert('此編輯欄位不可空白，請輸入內容。')
      return
    }

    if (mayContainRiskyScript(trimmedEmbeddedCode)) {
      const shouldContinue = window.confirm(
        '這段 Embedded Code 可能包含會執行的 script 或高風險 HTML 屬性。請確認來源可信任後再繼續。'
      )

      if (!shouldContinue) {
        return
      }
    }

    onConfirm(trimmedEmbeddedCode, currentLayout, currentCaption)
    onClose()
  }

  const deleteNode = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (typeof onDelete === 'function') {
      onDelete()
    }
  }

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a') {
      e.stopPropagation()
    }
  }

  return (
    <PluginDialog
      title="編輯 Embedded Code"
      className="EmbeddedCode__edit_dialog"
      actions={
        <>
          {onDelete && (
            <PluginButton variant="danger" onClick={deleteNode}>
              Delete
            </PluginButton>
          )}
          <PluginButton onClick={cancel}>Cancel</PluginButton>
          <PluginButton variant="primary" onClick={confirm}>
            Confirm
          </PluginButton>
        </>
      }
    >
      <PluginField label="Embedded Code">
        <PluginTextarea
          value={currentEmbeddedCode}
          onChange={(e) => setCurrentEmbeddedCode(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </PluginField>
      <PluginField label="Caption">
        <PluginTextInput
          type="text"
          value={currentCaption}
          onChange={(e) => setCurrentCaption(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </PluginField>
      <PluginField label="Layout">
        <EmbeddedCodeLayoutOptions
          layout={currentLayout}
          onChange={setCurrentLayout}
        />
      </PluginField>
    </PluginDialog>
  )
}

export default EmbeddedCodeEditDialog
