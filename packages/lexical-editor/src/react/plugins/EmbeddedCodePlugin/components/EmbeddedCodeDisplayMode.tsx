import { type FC, type ReactNode, useEffect, useRef } from 'react'

import type { EmbeddedCodeLayout } from '../types'

type ParsedEmbeddedCode = {
  htmlWithoutScripts: string
  scripts: HTMLScriptElement[]
}

function parseEmbeddedCode(embeddedCode: string): ParsedEmbeddedCode {
  const template = document.createElement('template')
  template.innerHTML = embeddedCode
  const scripts = Array.from(template.content.querySelectorAll('script'))
  scripts.forEach((scriptElement) => {
    scriptElement.remove()
  })

  return {
    htmlWithoutScripts: template.innerHTML,
    scripts,
  }
}

function dispatchWindowLoadEvent(): void {
  let loadEvent: Event
  try {
    loadEvent = new Event('load')
  } catch {
    loadEvent = document.createEvent('Event')
    loadEvent.initEvent('load', true, true)
  }
  window.dispatchEvent(loadEvent)
}

function createExecutableScript(scriptElement: HTMLScriptElement): HTMLScriptElement {
  const executableScript = document.createElement('script')

  Array.from(scriptElement.attributes).forEach((attribute) => {
    executableScript.setAttribute(attribute.name, attribute.value)
  })
  executableScript.text = scriptElement.src
    ? scriptElement.text
    : `${scriptElement.text}
document.currentScript?.dispatchEvent(new Event('load'));`

  return executableScript
}

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
    const { htmlWithoutScripts, scripts } = parseEmbeddedCode(embeddedCode)
    contentElement.innerHTML = htmlWithoutScripts

    if (scripts.length > 0) {
      let loadedScriptsCount = 0
      const scriptsFragment = document.createDocumentFragment()

      scripts.forEach((scriptElement) => {
        const executableScript = createExecutableScript(scriptElement)
        const handleScriptLoad = () => {
          loadedScriptsCount += 1
          if (loadedScriptsCount === scripts.length) {
            dispatchWindowLoadEvent()
          }
          executableScript.removeEventListener('load', handleScriptLoad)
        }

        executableScript.addEventListener('load', handleScriptLoad)
        scriptsFragment.appendChild(executableScript)
      })
      contentElement.appendChild(scriptsFragment)
    }

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
