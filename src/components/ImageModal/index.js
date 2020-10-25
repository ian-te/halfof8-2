import React, { useContext } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import { ReducerContext } from "../../reducers/root";

export const ImageModal = ({ images }) => {
  const {
    state: { modal },
    dispatch
  } = useContext(ReducerContext);
  const { isOpen, currentSlide } = modal;
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
