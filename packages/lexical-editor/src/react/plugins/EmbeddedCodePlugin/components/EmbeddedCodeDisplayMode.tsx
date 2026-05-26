import { type FC, type ReactNode, useEffect, useRef, useState } from 'react'

import type { EmbeddedCodeLayout } from '../types'

type ParsedEmbeddedCode = {
  htmlWithoutScripts: string
  scripts: HTMLScriptElement[]
}

type StorytellingEmbedData = {
  namespace: string
  pkg: string
  uuid: string
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

  if (scriptElement.src) {
    executableScript.async = false
  } else {
    executableScript.text = `${normalizeInlineScriptText(scriptElement.text)}
document.currentScript?.dispatchEvent(new Event('load'));`
  }

  return executableScript
}

function normalizeInlineScriptText(scriptText: string): string {
  if (
    !scriptText.includes('@story-telling-reporter') ||
    !scriptText.includes('scrollable-three-model')
  ) {
    return scriptText
  }

  return scriptText.replace(
    /(["']animationClip["']\s*:\s*)null/g,
    '$1{"name":"","duration":0,"tracks":[]}'
  )
}

function getMatchedString(
  text: string,
  pattern: RegExp
): string | undefined {
  const match = text.match(pattern)
  return match?.[1]
}

function parseStorytellingEmbedData(
  scriptText: string
): StorytellingEmbedData | undefined {
  const namespace = getMatchedString(
    scriptText,
    /var\s+namespace\s*=\s*['"]([^'"]+)['"]/
  )
  const pkg = getMatchedString(scriptText, /var\s+pkg\s*=\s*['"]([^'"]+)['"]/)
  const uuid = getMatchedString(scriptText, /["']uuid["']\s*:\s*["']([^"']+)["']/)

  if (!namespace || !pkg || !uuid) {
    return undefined
  }

  return {
    namespace,
    pkg,
    uuid,
  }
}

function removeStorytellingEmbedData({
  namespace,
  pkg,
  uuid,
}: StorytellingEmbedData): void {
  const windowWithEmbeds = window as unknown as Record<string, unknown>
  const namespaceValue = windowWithEmbeds[namespace]
  if (!namespaceValue || typeof namespaceValue !== 'object') {
    return
  }

  const packageData = (namespaceValue as Record<string, unknown>)[pkg]
  if (!Array.isArray(packageData)) {
    return
  }

  const filteredPackageData = packageData.filter((item) => {
    if (!item || typeof item !== 'object') {
      return true
    }

    return (item as { uuid?: unknown }).uuid !== uuid
  })

  ;(namespaceValue as Record<string, unknown>)[pkg] = filteredPackageData
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
    let isDisposed = false

    if (scripts.length > 0) {
      let finishedScriptsCount = 0
      const scriptsFragment = document.createDocumentFragment()
      const storytellingEmbedDataList = scripts
        .map((scriptElement) => parseStorytellingEmbedData(scriptElement.text))
        .filter(
          (storytellingEmbedData): storytellingEmbedData is StorytellingEmbedData =>
            Boolean(storytellingEmbedData)
        )

      storytellingEmbedDataList.forEach(removeStorytellingEmbedData)

      const finishScript = (scriptElement: HTMLScriptElement) => {
        scriptElement.removeEventListener('load', handleScriptLoad)
        scriptElement.removeEventListener('error', handleScriptError)
        if (isDisposed) {
          return
        }

        finishedScriptsCount += 1
        if (finishedScriptsCount === scripts.length) {
          contentElement.dataset.scriptsLoaded = 'true'
          setIsScriptLoading(false)
        }
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
      isDisposed = true
      contentElement.removeEventListener('load', handleLoad, true)
      contentElement.innerHTML = ''
      delete contentElement.dataset.loaded
      delete contentElement.dataset.scriptsLoaded
      scripts
        .map((scriptElement) => parseStorytellingEmbedData(scriptElement.text))
        .filter(
          (storytellingEmbedData): storytellingEmbedData is StorytellingEmbedData =>
            Boolean(storytellingEmbedData)
        )
        .forEach(removeStorytellingEmbedData)
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
