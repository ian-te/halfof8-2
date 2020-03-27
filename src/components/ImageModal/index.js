import React, { useContext } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import { ModalContext } from "../../pages/index";

export const ImageModal = ({ images }) => {
  const { state, dispatch } = useContext(ModalContext);
  const { isOpen, currentSlide } = state;
  return (
    <ModalGateway>
      {isOpen && (
        <Modal onClose={() => dispatch({ type: "CLOSE_MODAL" })}>
          <Carousel currentIndex={currentSlide} views={images} />
        </Modal>
      )}
    </ModalGateway>
  );
};
