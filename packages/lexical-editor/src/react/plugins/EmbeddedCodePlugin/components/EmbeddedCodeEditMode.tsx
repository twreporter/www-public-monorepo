import { type FC, useState } from 'react'

import type { EmbeddedCodeLayout } from '../types'
import EmbeddedCodeEditDialog from './EmbeddedCodeEditDialog'
import EmbeddedCodeSnapshotMode from './EmbeddedCodeSnapshotMode'

type EmbeddedCodeEditModeProps = {
  embeddedCode: string
  caption: string
  layout: EmbeddedCodeLayout
  onConfirm: (
    embeddedCode: string,
    layout: EmbeddedCodeLayout,
    caption: string
  ) => void
  onDelete: () => void
}

const EmbeddedCodeEditMode: FC<EmbeddedCodeEditModeProps> = ({
  embeddedCode,
  caption,
  layout,
  onConfirm,
  onDelete,
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const openEditDialog = () => setIsOpenEdit(true)
  const closeEditDialog = () => setIsOpenEdit(false)

  const confirmEdit = (
    nextEmbeddedCode: string,
    nextLayout: EmbeddedCodeLayout,
    nextCaption: string
  ) => {
    onConfirm(nextEmbeddedCode, nextLayout, nextCaption)
    closeEditDialog()
  }

  return (
    <>
      <EmbeddedCodeSnapshotMode
        embeddedCode={embeddedCode}
        caption={caption}
        layout={layout}
        onClick={openEditDialog}
      >
        <button
          type="button"
          className="EmbeddedCode__edit_target"
          aria-label="Edit embedded code"
          onClick={openEditDialog}
        />
        <div className="EmbeddedCode__edit">
          <button type="button">
            <i className="image-edit" />
          </button>
        </div>
      </EmbeddedCodeSnapshotMode>

      {isOpenEdit ? (
        <EmbeddedCodeEditDialog
          embeddedCode={embeddedCode}
          layout={layout}
          caption={caption}
          onConfirm={confirmEdit}
          onClose={closeEditDialog}
          onDelete={onDelete}
        />
      ) : null}
    </>
  )
}

export default EmbeddedCodeEditMode
