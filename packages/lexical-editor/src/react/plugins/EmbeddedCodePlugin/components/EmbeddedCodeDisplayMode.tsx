import { type FC, type ReactNode, useEffect, useRef, useState } from 'react'

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

function createExecutableScript(scriptElement: HTMLScriptElement): HTMLScriptElement {
  const executableScript = document.createElement('script')

  Array.from(scriptElement.attributes).forEach((attribute) => {
    executableScript.setAttribute(attribute.name, attribute.value)
  })

  if (!scriptElement.src) {
    executableScript.text = `${scriptElement.text}
document.currentScript?.dispatchEvent(new Event('load'));`
  }

  return executableScript
}

type EmbeddedCodeDisplayModeProps = {
  embeddedCode: string
  caption: string
  layout: EmbeddedCodeLayout
  showLoading: boolean
  children?: ReactNode
  onClick?: () => void
}

const EmbeddedCodeDisplayMode: FC<EmbeddedCodeDisplayModeProps> = ({
  embeddedCode,
  caption,
  layout,
  showLoading,
  children,
  onClick,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isScriptLoading, setIsScriptLoading] = useState(false)

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
    setIsScriptLoading(scripts.length > 0)

    if (scripts.length > 0) {
      let finishedScriptsCount = 0
      const scriptsFragment = document.createDocumentFragment()
      const finishScript = (scriptElement: HTMLScriptElement) => {
        finishedScriptsCount += 1
        if (finishedScriptsCount === scripts.length) {
          contentElement.dataset.scriptsLoaded = 'true'
          setIsScriptLoading(false)
        }
        scriptElement.removeEventListener('load', handleScriptLoad)
        scriptElement.removeEventListener('error', handleScriptError)
      }
      const handleScriptLoad = (event: Event) => {
        finishScript(event.currentTarget as HTMLScriptElement)
      }
      const handleScriptError = (event: Event) => {
        const scriptElement = event.currentTarget as HTMLScriptElement
        console.error(
          'Failed to load embedded code script.',
          scriptElement.src || scriptElement.text
        )
        finishScript(scriptElement)
      }

      scripts.forEach((scriptElement) => {
        const executableScript = createExecutableScript(scriptElement)

        executableScript.addEventListener('load', handleScriptLoad)
        executableScript.addEventListener('error', handleScriptError)
        scriptsFragment.appendChild(executableScript)
      })
      contentElement.appendChild(scriptsFragment)
    } else {
      setIsScriptLoading(false)
    }

    return () => {
      contentElement.removeEventListener('load', handleLoad, true)
      contentElement.innerHTML = ''
      delete contentElement.dataset.loaded
      delete contentElement.dataset.scriptsLoaded
    }
  }, [embeddedCode])

  const shouldShowLoading = showLoading && isScriptLoading

  return (
    <div className={`EmbeddedCode__container ${layout}`}>
      <div
        className={`EmbeddedCode__block ${layout} ${
          onClick ? 'is-editable' : ''
        }`.trim()}
        onClick={onClick}
      >
        <div
          className={`EmbeddedCode__content_body ${layout} ${
            shouldShowLoading ? 'is-loading' : ''
          }`.trim()}
        >
          {shouldShowLoading ? (
            <div className="EmbeddedCode__loading" aria-busy="true">
              <div className="Image__skeleton_media" />
            </div>
          ) : null}
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
