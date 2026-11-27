import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { safeContentUrl } from './data'
import { ArticleSlideshow } from './slideshow'

type Node = {
  type: string
  children?: Node[]
  text?: string
  format?: number | string
  style?: string
  tag?: string
  url?: string
  target?: string
  start?: number
  value?: number
  imageUrl?: string
  imageLayout?: string
  imageTitle?: string
  caption?: string
  layout?: string
  quoteBy?: string
  embeddedCode?: string
  slides?: { url: string; caption?: string }[]
}

export function contentNodes(value: unknown): Node[] {
  if (!value || typeof value !== 'object' || !('root' in value)) return []
  const root = value.root
  if (!root || typeof root !== 'object' || !('children' in root)) return []
  return Array.isArray(root.children) ? root.children : []
}

function textStyle(value?: string): CSSProperties {
  const result: CSSProperties = {}
  // The CMS exposes text/background colors. Do not import arbitrary layout CSS.
  for (const declaration of value?.split(';') ?? []) {
    const [property, color] = declaration.split(':').map((part) => part.trim())
    if (!color || !/^(#[\da-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i.test(color)) continue
    if (property === 'color') result.color = color
    if (property === 'background-color') result.backgroundColor = color
  }
  return result
}

function renderText(node: Node): ReactNode {
  const format = typeof node.format === 'number' ? node.format : 0
  let text: ReactNode = node.text ?? ''
  if (format & 1) text = <strong>{text}</strong>
  if (format & 2) text = <em>{text}</em>
  if (format & 4) text = <s>{text}</s>
  if (format & 8) text = <u>{text}</u>
  if (format & 16) text = <code>{text}</code>
  if (format & 32) text = <sub>{text}</sub>
  if (format & 64) text = <sup>{text}</sup>
  const style = textStyle(node.style)
  // Lexical reserves bit 128 for highlight; case transforms start at bit 256.
  if (format & 256) style.textTransform = 'lowercase'
  if (format & 512) style.textTransform = 'uppercase'
  if (format & 1024) style.textTransform = 'capitalize'
  return <span style={style}>{text}</span>
}

function renderNode(node: Node): ReactNode {
  const children = renderNodes(node.children ?? [])
  const align = typeof node.format === 'string' && ['left', 'right', 'center', 'justify'].includes(node.format)
    ? { textAlign: node.format as CSSProperties['textAlign'] } : undefined
  switch (node.type) {
    case 'text': return renderText(node)
    case 'linebreak': return <br />
    case 'tab': return '\t'
    // Annotation nodes are block-level details within Lexical paragraphs.
    case 'paragraph': return <div className="article-paragraph" style={align}>{children}</div>
    case 'heading': {
      const Heading = node.tag === 'h3' ? 'h3' : node.tag === 'h4' ? 'h4' : 'h2'
      return <Heading style={align}>{children}</Heading>
    }
    case 'list': return node.tag === 'ol' ? <ol start={node.start}>{children}</ol> : <ul>{children}</ul>
    case 'listitem': return <li value={node.value}>{children}</li>
    case 'link':
    case 'autolink': {
      const href = safeContentUrl(node.url)
      return href ? <a href={href} target={node.target === '_blank' ? '_blank' : undefined} rel="noopener noreferrer">{children}</a> : children
    }
    case 'annotation': return <details className="article-annotation">{children}</details>
    case 'annotated-text': return <summary>{node.text}</summary>
    case 'annotation-content': return <div className="article-annotation-content">{children}</div>
    case 'www-quote': return <figure className={`article-quote ${node.layout === 'blockquote' ? 'blockquote' : ''}`}>{children}</figure>
    case 'www-quote-content': return <blockquote>{children}</blockquote>
    case 'www-quote-by': return <figcaption>{node.quoteBy}</figcaption>
    case 'quote': return <blockquote>{children}</blockquote>
    case 'infobox': return <aside className="article-infobox">{children}</aside>
    case 'horizontalrule': return <hr />
    case 'image': {
      const src = safeContentUrl(node.imageUrl)
      return src ? <figure className={`article-image ${node.imageLayout === 'small' || node.imageLayout === 'right' ? node.imageLayout : ''}`}>
        {/* biome-ignore lint/performance/noImgElement: CMS media can originate from external hosts. */}
        <img src={src} alt={node.caption || node.imageTitle || ''} loading="lazy" />
        {node.caption && <figcaption>{node.caption}</figcaption>}
      </figure> : null
    }
    case 'slide-show': return <ArticleSlideshow slides={(node.slides ?? []).filter((slide) => safeContentUrl(slide.url))} />
    case 'embedded-code': return node.embeddedCode ? <figure className={`article-embed ${node.layout === 'fullscreen' ? 'fullscreen' : ''}`}>
      <iframe title={node.caption || '嵌入內容'} srcDoc={node.embeddedCode} sandbox="allow-scripts allow-popups allow-presentation" loading="lazy" />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </figure> : null
    default: return children
  }
}

function renderNodes(nodes: Node[]): ReactNode {
  return nodes.map((node, index) => (
    // Serialized nodes have no stable IDs; document order is immutable here.
    // biome-ignore lint/suspicious/noArrayIndexKey: static server-rendered document
    <Fragment key={index}>{renderNode(node)}</Fragment>
  ))
}

export default function RichText({ value }: { value: unknown }) {
  return renderNodes(contentNodes(value))
}
