import type { controller } from '@keystone-6/core/fields/types/json/views'
import type { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { useEffect, useState } from 'react'
import { DnD } from '../../DragAndDrop'

export type RelationshipInfo = {
  id: string
  label: string
}

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const [prevValue, setPrevValue] = useState(value)
  const [relationships, setRelationships] = useState<RelationshipInfo[]>(
    value ? JSON.parse(value) : []
  )

  // Pattern for monitoring props change:
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (value !== prevValue) {
    setPrevValue(value)
    setRelationships(value ? JSON.parse(value) : [])
  }

  useEffect(() => {
    onChange(JSON.stringify(relationships))
  }, [relationships])

  const relationshipsDndComponent = (
    <DnD items={relationships} setItems={setRelationships} />
  )

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {relationshipsDndComponent}
    </FieldContainer>
  )
}
