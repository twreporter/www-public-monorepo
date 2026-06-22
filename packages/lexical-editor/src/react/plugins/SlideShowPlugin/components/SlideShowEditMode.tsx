import { type FC, useState } from 'react'

import { useImageConfig } from '../../../context/ImageConfigContext'
import type { SlideShowSlide } from '../types'
import SlideShowDisplayMode from './SlideShowDisplayMode'
import SlideShowEditDialog from './SlideShowEditDialog'

type SlideShowEditModeProps = {
  slides: SlideShowSlide[]
  onConfirm: (slides: SlideShowSlide[]) => void
  onDelete: () => void
}

const SlideShowEditMode: FC<SlideShowEditModeProps> = ({
  onConfirm,
  onDelete,
  slides,
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const imageConfig = useImageConfig()

  const closeEditDialog = () => setIsOpenEdit(false)

  const confirmEdit = (nextSlides: SlideShowSlide[]) => {
    onConfirm(nextSlides)
    closeEditDialog()
  }

  return (
    <>
      <SlideShowDisplayMode
        editable
        slides={slides}
        onEdit={() => setIsOpenEdit(true)}
      />
      {isOpenEdit && imageConfig?.imageFromDb ? (
        <SlideShowEditDialog
          imageFromDb={imageConfig.imageFromDb}
          initialSlides={slides}
          onClose={closeEditDialog}
          onConfirm={confirmEdit}
          onDelete={onDelete}
        />
      ) : null}
    </>
  )
}

export default SlideShowEditMode
