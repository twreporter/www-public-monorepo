import type {JSX} from 'react'

import {LinkPlugin as LexicalLinkPlugin} from '@lexical/react/LexicalLinkPlugin'
import * as React from 'react'

import {validateUrl} from '../../utils/url'


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