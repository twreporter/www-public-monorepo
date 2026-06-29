import type { EditorTheme } from '../../core/types/theme'

export const createTailwindEditorTheme = (): EditorTheme => {
  return {
    classes: {
      paragraph: 'mb-2 leading-7',
      heading: {
        h1: 'text-3xl font-bold mb-4',
        h2: 'text-2xl font-bold mb-3',
        h3: 'text-xl font-semibold mb-2',
        h4: 'text-lg font-semibold mb-2',
      },
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        code: 'font-mono text-sm bg-gray-100 px-1 py-0.5 rounded',
      },
      list: {
        ul: 'list-disc pl-6',
        ol: 'list-decimal pl-6',
      },
      link: 'text-blue-600 underline',
    },
    tokens: {
      colorTextPrimary: 'text-gray-900',
      colorTextMuted: 'text-gray-500',
      colorBgCanvas: 'bg-white',
      colorBgToolbar: 'bg-gray-50',
      colorBorderSubtle: 'border-gray-200',
      colorAccent: 'text-blue-600',
      radiusSm: 'rounded',
      radiusMd: 'rounded-md',
      shadowPopover: 'shadow-md',
      fontBody: 'font-sans',
      fontMono: 'font-mono',
    },
  }
}

export const tailwindEditorTheme = createTailwindEditorTheme()
