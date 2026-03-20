import styled from '@emotion/styled'
import type { JSX, HTMLInputTypeAttribute } from 'react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`
const Label = styled.label`
  display: flex;
  flex: 1;
  color: #666;
`
const Input = styled.input`
  display: flex;
  flex: 2;
  border: 1px solid #999;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  border-radius: 5px;
  min-width: 0;
`

type Props = Readonly<{
  'data-test-id'?: string
  label: string
  onChange: (val: string) => void
  placeholder?: string
  value: string
  type?: HTMLInputTypeAttribute
}>

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = '',
  'data-test-id': dataTestId,
  type = 'text',
}: Props): JSX.Element {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        data-test-id={dataTestId}
      />
    </Wrapper>
  )
}
