import {
  createCommand,
  type LexicalCommand,
} from 'lexical'

export const OPEN_EMBEDDED_CODE_DIALOG_COMMAND: LexicalCommand<void> =
  createCommand('OPEN_EMBEDDED_CODE_DIALOG')

export const OPEN_IMAGE_FROM_DB_DIALOG_COMMAND: LexicalCommand<void> =
  createCommand('OPEN_IMAGE_FROM_DB_DIALOG')
