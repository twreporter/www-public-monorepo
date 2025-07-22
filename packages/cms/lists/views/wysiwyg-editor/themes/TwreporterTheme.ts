/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from 'lexical'

import './TwreporterTheme.css'

const theme: EditorThemeClasses = {
  blockCursor: 'TwreporterTheme__blockCursor',
  characterLimit: 'TwreporterTheme__characterLimit',
  embedBlock: {
    base: 'TwreporterTheme__embedBlock',
    focus: 'TwreporterTheme__embedBlockFocus',
  },
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
}

export default theme
