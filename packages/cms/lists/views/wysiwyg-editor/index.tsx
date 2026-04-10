import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import React, { useMemo } from 'react'
// lexical
import { LexicalEditor } from '@twreporter/lexical-editor'
import { LexicalBox, StyleWrapper } from './style'
// config
import createLexicalEditorConfig from './config'
// css
import '@twreporter/lexical-editor/style'

// for multiple react instance debuging
if (typeof window !== 'undefined') {
  ;(window as any).__CMS_REACT__ = React
}

export const Field = ({
  value,
  field,
  onChange,
}: FieldProps<typeof controller>) => {
  const valueJSON = useMemo(
    () => (value ? JSON.parse(value) : undefined),
    [value]
  )
  const config = createLexicalEditorConfig()
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <LexicalBox id="www-lexical-editor">
        <StyleWrapper>
          <LexicalEditor value={valueJSON} onChange={onChange} config={config} />
        </StyleWrapper>
      </LexicalBox>
    </FieldContainer>
  )
}
