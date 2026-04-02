import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import type { JSX } from 'react'

type Props = {
  placeholder: string
}

export default function LexicalContentEditable({
  placeholder,
}: Props): JSX.Element {
  return (
    <ContentEditable
      aria-placeholder={placeholder}
      className="lexical-content-editable"
      placeholder={
        <div className="placeholder">
          {placeholder}
        </div>
      }
    />
  )
}
