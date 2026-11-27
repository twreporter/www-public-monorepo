import type { EditorTheme } from '../../core/types/theme'

// Block spacing and responsive column placement belong to the consuming layout.
const bodyText =
  'font-default text-[length:var(--article-font-size,18px)] leading-[2.1] tracking-[0.006em] text-gray-800 break-words'
const heading =
  'font-default pt-5 font-bold leading-[1.25] text-gray-800 break-words'
const media = 'block max-w-full py-5'

/** Article typography using @twreporter/tailwind-config fonts and breakpoints. */
export const createTailwindEditorTheme = (): EditorTheme => {
  return {
    classes: {
      paragraph: bodyText,
      heading: {
        h1: 'font-title text-[28px] desktop:text-[36px] font-bold leading-[1.25] text-gray-800 break-words',
        h2: `${heading} text-[24px] desktop:text-[32px]`,
        h3: `${heading} text-[22px] desktop:text-[28px]`,
        h4: `${heading} text-[22px]`,
      },
      hr: 'w-full h-px border-0 bg-gray-300',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        underlineStrikethrough: '[text-decoration-line:underline_line-through]',
        subscript: 'align-sub text-[length:smaller]',
        superscript: 'align-super text-[length:smaller]',
        capitalize: 'capitalize',
        lowercase: 'lowercase',
        uppercase: 'uppercase',
        code: 'font-mono text-sm bg-gray-100 px-1 py-0.5 rounded',
      },
      list: {
        ul: `${bodyText} list-disc pl-[1.5em]`,
        ol: `${bodyText} list-decimal pl-[1.5em]`,
      },
      link: 'text-inherit underline decoration-[0.02em] underline-offset-[0.2em] hover:text-supportive-heavy',
      embeddedCode: `${media} [&_iframe]:block [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:aspect-[3/2] [&_iframe]:h-auto [&_iframe]:border-0`,
      image: `${media} [&_img]:block [&_img]:w-full [&_img]:max-w-full [&_img]:h-auto`,
      slideshow: media,
    },
    tokens: {
      colorText: 'var(--color-gray-800, #404040)',
      colorLinkHover: 'var(--color-supportive-heavy, #9f7544)',
      colorLinkBottom: 'rgba(128, 128, 128, 0.5)',
      colorDivider: 'var(--color-gray-300, #cdcdcd)',
      colorInfoboxText: 'var(--color-gray-700, #666666)',
      colorBgInfobox: 'var(--color-gray-white, #ffffff)',
      colorInfoboxDressing: 'var(--color-supportive-main, #c09662)',
      colorBgCanvas: 'var(--color-gray-100, #f1f1f1)',
      colorBgToolbar: 'var(--color-gray-white, #ffffff)',
    },
  }
}

export const tailwindEditorTheme = createTailwindEditorTheme()
