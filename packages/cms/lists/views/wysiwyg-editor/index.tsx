import styled from '@emotion/styled'
import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { useMemo } from 'react'
import Editor from './Editor'

const Box = styled.div`
  background-color: #fafbfc;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
`

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
      <Box id="lexical-editor">
        <Editor value={valueJSON} onChange={onChange} />
      </Box>
    </FieldContainer>
  )
}
