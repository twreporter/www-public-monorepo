import styled from '@emotion/styled'
import React from 'react'
// type
import type {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '@keystone-6/core/types'
// components
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from '@keystone-ui/fields'

const Container = styled.div`
  display: flex;
  gap: 16px;
`

type RelationshipLinkValue = {
  summary?: string
  link: {
    url: string
    desc: string
  }
} | null

export const Field = ({
  field,
  value,
}: FieldProps<typeof controller> & { value: RelationshipLinkValue}) => {
  if (!value) {
    return (
      <FieldContainer>
        <FieldLabel htmlFor={field.path}>{field.label}</FieldLabel>
        <div>目前沒有資料</div>
      </FieldContainer>
    )
  }
  const { summary, link } = value
  return (
    <FieldContainer>
      <FieldLabel htmlFor={field.path}>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>
      <Container>
        { summary ? (<div>{summary}</div>) : null }
        <a href={link.url} target="_self">{link.desc}</a>
      </Container>
    </FieldContainer>
  )
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = `${item[field.path]}`
  return linkTo ? (
    <CellLink {...linkTo}>{value}</CellLink>
  ) : (
    <CellContainer>{value}</CellContainer>
  )
}
Cell.supportsLinkTo = true

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path]}
    </FieldContainer>
  )
}

export const controller = (
  config: FieldControllerConfig
): FieldController<RelationshipLinkValue> => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: (data) => data[config.path] ?? null,
    serialize: () => {},
  }
}
