import * as React from 'react'
import type { JSX } from 'react'
// lexical
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
// util
import { validateUrl } from '../../utils/url'

export default function LinkPlugin(): JSX.Element {
  return (
    <LexicalLinkPlugin
      validateUrl={validateUrl}
      attributes={{
        rel: 'noopener noreferrer',
        target: '_blank',
      }}
    />
  )
}
