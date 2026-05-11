import type { FC, ReactNode } from 'react'

import type { EmbeddedCodeLayout } from '../types'

type EmbeddedCodeSnapshotModeProps = {
  embeddedCode: string
  caption: string
  layout: EmbeddedCodeLayout
  children?: ReactNode
  onClick: () => void
}

const EmbeddedCodeSnapshotMode: FC<EmbeddedCodeSnapshotModeProps> = ({
  embeddedCode,
  caption,
  layout,
  children,
  onClick,
}) => {
  const codeSnapshot = embeddedCode.trim()

  return (
    <div className={`EmbeddedCode__container ${layout}`}>
      <div
        className={`EmbeddedCode__block ${layout} is-editable`}
        onClick={onClick}
      >
        <div className={`EmbeddedCode__snapshot ${layout}`}>
          <div className="EmbeddedCode__snapshot_header">
            <span>Embedded Code</span>
          </div>
          <pre className="EmbeddedCode__snapshot_code">{codeSnapshot}</pre>
          {caption ? (
            <div className="EmbeddedCode__caption">{caption}</div>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  )
}

export default EmbeddedCodeSnapshotMode
