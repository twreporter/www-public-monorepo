import { type FC, type ReactNode, useEffect, useRef } from 'react'

import type { EmbeddedCodeLayout } from '../types'

type EmbeddedCodeDisplayModeProps = {
  embeddedCode: string
  caption: string
  layout: EmbeddedCodeLayout
  children?: ReactNode
  onClick?: () => void
}

const EmbeddedCodeDisplayMode: FC<EmbeddedCodeDisplayModeProps> = ({
  embeddedCode,
  caption,
  layout,
  children,
  onClick,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const contentElement = contentRef.current
    if (!contentElement) {
      return
    }

    const handleLoad = () => {
      contentElement.dataset.loaded = 'true'
    }

    contentElement.addEventListener('load', handleLoad, true)
    contentElement.innerHTML = embeddedCode

    const scriptElements = Array.from(
      contentElement.querySelectorAll('script')
    )
    scriptElements.forEach((scriptElement) => {
      const executableScript = document.createElement('script')

      Array.from(scriptElement.attributes).forEach((attribute) => {
        executableScript.setAttribute(attribute.name, attribute.value)
      })
      executableScript.text = scriptElement.text

      scriptElement.replaceWith(executableScript)
    })

    return () => {
      contentElement.removeEventListener('load', handleLoad, true)
      contentElement.innerHTML = ''
      delete contentElement.dataset.loaded
    }
  }, [embeddedCode])

  return (
    <div className={`EmbeddedCode__container ${layout}`}>
      <div
        className={`EmbeddedCode__block ${layout} ${
          onClick ? 'is-editable' : ''
        }`.trim()}
        onClick={onClick}
      >
        <div className={`EmbeddedCode__content_body ${layout}`}>
          <div ref={contentRef} className="EmbeddedCode__html" />
          {caption ? (
            <div className="EmbeddedCode__caption">
              {caption}
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  )
}

export default EmbeddedCodeDisplayMode
