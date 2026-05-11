export type EmbeddedCodeLayout = 'default' | 'fullscreen'

export type EmbeddedCodeAddCommandPayload = {
  embeddedCode: string
  caption?: string
  layout: EmbeddedCodeLayout
}
