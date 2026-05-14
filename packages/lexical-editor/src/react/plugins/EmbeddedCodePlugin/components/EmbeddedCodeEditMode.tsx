import { type FC, useState } from 'react'

import type { EmbeddedCodeLayout } from '../types'
import EmbeddedCodeEditDialog from './EmbeddedCodeEditDialog'
import EmbeddedCodeSnapshotMode from './EmbeddedCodeSnapshotMode'

type EmbeddedCodeEditModeProps = {
  embeddedCode: string
  caption: string
  layout: EmbeddedCodeLayout
  showLoading: boolean
  onConfirm: (
    embeddedCode: string,
    layout: EmbeddedCodeLayout,
    caption: string,
    showLoading: boolean
  ) => void
  onDelete: () => void
}

const EmbeddedCodeEditMode: FC<EmbeddedCodeEditModeProps> = ({
  embeddedCode,
  caption,
  layout,
  showLoading,
  onConfirm,
  onDelete,
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const openEditDialog = () => setIsOpenEdit(true)
  const closeEditDialog = () => setIsOpenEdit(false)

  const confirmEdit = (
    nextEmbeddedCode: string,
    nextLayout: EmbeddedCodeLayout,
    nextCaption: string,
    nextShowLoading: boolean
  ) => {
    onConfirm(nextEmbeddedCode, nextLayout, nextCaption, nextShowLoading)
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
          showLoading={showLoading}
          onConfirm={confirmEdit}
          onClose={closeEditDialog}
          onDelete={onDelete}
        />
      ) : null}
    </>
  )
}

export default EmbeddedCodeEditMode
