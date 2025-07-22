import styled from '@emotion/styled'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import * as React from 'react'
// utils
import { desktopAndAbove } from '../utils/media-query'

const StyledContentEditable = styled(ContentEditable)`
  border: 0;
  font-size: 15px;
  display: block;
  position: relative;
  outline: 0;
  padding: 8px 28px 40px;
  min-height: 150px;

  ${desktopAndAbove(`
    padding-left: 8px;
    padding-right: 8px;
  `)}
`
const PlaceHolder = styled.div`
  font-size: 15px;
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 8px;
  left: 28px;
  right: 28px;
  user-select: none;
  white-space: nowrap;
  display: inline-block;
  pointer-events: none;

  ${desktopAndAbove(`
    left: 8px;
    right: 8px;
  `)}
`

type Props = {
  className?: string
  placeholderClassName?: string
  placeholder: string
}

export default function LexicalContentEditable({
  className,
  placeholder,
  placeholderClassName,
}: Props): JSX.Element {
  return (
    <StyledContentEditable
      className={className}
      aria-placeholder={placeholder}
      placeholder={
        <PlaceHolder className={placeholderClassName}>
          {placeholder}
        </PlaceHolder>
      }
    />
  )
}
