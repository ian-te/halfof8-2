import React, { useState } from "react"
import Carousel, { Modal, ModalGateway } from "react-images"

export const useModalState = () => {
  const [state, setState] = useState({ isOpen: false, currentSlide: 0 })

  return [state, setState]
}

export const ImageModal = ({ images, isOpen, currentIndex, setModalState }) => {
  return (
    <ModalGateway>
      {isOpen && (
        <Modal onClose={() => setModalState({ isOpen: false })}>
          <Carousel currentIndex={currentIndex} views={images} />
        </Modal>
      )}
    </ModalGateway>
  )
}
