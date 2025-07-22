import styled from '@emotion/styled'
import { isDOMNode } from 'lexical'
import React, { type ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  title: string
  closeOnClickOutside?: boolean
  onClose: () => void
  children: ReactNode
}

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  flex-direction: column;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(40, 40, 40, 0.6);
  flex-grow: 0px;
  flex-shrink: 1px;
  z-index: 100;
`
const ModalRefNode = styled.div`
  padding: 20px;
  min-height: 100px;
  min-width: 300px;
  display: flex;
  flex-grow: 0px;
  background-color: #f1f1f1;
  flex-direction: column;
  position: relative;
  box-shadow: 0 0 20px 0 #444;
  border-radius: 10px;
`
const Title = styled.h2`
  color: #444;
  margin: 0px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`
const CloseButton = styled.button`
  border: 0px;
  position: absolute;
  right: 20px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  background-color: #eee;

  &:hover {
    background-color: #ddd;
  }
`
const Content = styled.div`
  padding-top: 20px;
`

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
    <Overlay role="dialog">
      <ModalRefNode tabIndex={-1} ref={modalRef}>
        <Title>{title}</Title>
        <CloseButton aria-label="Close modal" type="button" onClick={onClose}>
          X
        </CloseButton>
        <Content>{children}</Content>
      </ModalRefNode>
    </Overlay>
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
