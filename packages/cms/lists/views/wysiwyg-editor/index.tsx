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

const lexicalEditorConfig = createLexicalEditorConfig()

export const Field = ({
  value,
  field,
  onChange,
}: FieldProps<typeof controller>) => {
  const valueJSON = useMemo(
    () => (value ? JSON.parse(value) : null),
    [value]
  )

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <LexicalBox id="www-lexical-editor">
        <StyleWrapper>
          <LexicalEditor
            value={valueJSON}
            onChange={onChange}
            config={lexicalEditorConfig}
          />
        </StyleWrapper>
      </LexicalBox>
    </FieldContainer>
  )
}
