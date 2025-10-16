import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import React, { useMemo } from 'react'
// components
import Editor from './Editor'
import { LexicalBox } from './style/style'

export const Field = ({
  value,
  field,
  onChange,
}: FieldProps<typeof controller>) => {
  const valueJSON = useMemo(
    () => (value ? JSON.parse(value) : undefined),
    [value]
  )
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <LexicalBox id="lexical-editor">
        <Editor value={valueJSON} onChange={onChange} />
      </LexicalBox>
    </FieldContainer>
  )
}
