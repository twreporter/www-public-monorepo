import type { EditorTheme } from '../../core/types/theme'
import ColorPicker from './components/DropdownColorPicker'

export const createEmotionEditorTheme = (): EditorTheme => {
  return {
    classes: {
      heading: {
        h1: 'TwreporterTheme__h1',
        h2: 'TwreporterTheme__h2',
        h3: 'TwreporterTheme__h3',
        h4: 'TwreporterTheme__h4',
        h5: 'TwreporterTheme__h5',
        h6: 'TwreporterTheme__h6',
      },
      hr: 'TwreporterTheme__hr',
      paragraph: 'TwreporterTheme__paragraph',
      specialText: 'TwreporterTheme__specialText',
      text: {
        bold: 'TwreporterTheme__textBold',
        capitalize: 'TwreporterTheme__textCapitalize',
        code: 'TwreporterTheme__textCode',
        italic: 'TwreporterTheme__textItalic',
        lowercase: 'TwreporterTheme__textLowercase',
        strikethrough: 'TwreporterTheme__textStrikethrough',
        subscript: 'TwreporterTheme__textSubscript',
        superscript: 'TwreporterTheme__textSuperscript',
        underline: 'TwreporterTheme__textUnderline',
        underlineStrikethrough: 'TwreporterTheme__textUnderlineStrikethrough',
        uppercase: 'TwreporterTheme__textUppercase',
      },
      list: {
        ul: 'TwreporterTheme__ul',
        ol: 'TwreporterTheme__ol',
      },
      link: 'TwreporterTheme__link',
    },
    tokens: {
      colorTextPrimary: '#111111',
      colorTextMuted: '#666666',
      colorBgCanvas: '#ffffff',
      colorBgToolbar: '#f5f5f5',
      colorBorderSubtle: '#dddddd',
      colorAccent: '#0055ff',
      radiusSm: '4px',
      radiusMd: '8px',
      shadowPopover: '0 4px 12px rgba(0, 0, 0, 0.12)',
      fontBody: 'system-ui, sans-serif',
      fontMono: 'ui-monospace, monospace',
    },
    components: {
      ColorPicker,
    }
  }
}

export const emotionEditorTheme = createEmotionEditorTheme()
