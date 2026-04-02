import { isDOMNode } from 'lexical'
import { type ReactNode, type JSX, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  title: string
  closeOnClickOutside?: boolean
  onClose: () => void
  children: ReactNode
}

function PortalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus()
    }
  }, [])

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target
      if (
        modalRef.current !== null &&
        isDOMNode(target) &&
        !modalRef.current.contains(target) &&
        closeOnClickOutside
      ) {
        onClose()
      }
    }
    const modelElement = modalRef.current
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener('click', clickOutsideHandler)
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler)
      }
    }
  }, [closeOnClickOutside, onClose])

  return (
    <div role="dialog" className="lexical-modal">
      <div tabIndex={-1} ref={modalRef} className="ref-node">
        <h2 className="title">{title}</h2>
        <button className="close-button" aria-label="Close modal" type="button" onClick={onClose}>
          X
        </button>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

const Modal = ({
  onClose,
  children,
  title,
  closeOnClickOutside = false,
}: ModalProps): JSX.Element => {
  return createPortal(
    <PortalImpl
      onClose={onClose}
      title={title}
      closeOnClickOutside={closeOnClickOutside}
    >
      {children}
    </PortalImpl>,
    document.body
  )
}

export default Modal
