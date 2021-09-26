import React from "react";
import Lightbox from "./components/Modal";
import { useReducerContext } from "../../reducers/root";

export const ImageModal = ({ images }) => {
  const {
    state: { modal },
    dispatch,
  } = useReducerContext();
  const { isOpen, currentSlide } = modal;
  return (
    <Lightbox
      isOpen={isOpen}
      onPrev={() => {
        if (currentSlide > 0) {
          dispatch({ type: "PREV_SLIDE" });
        }
      }}
      onNext={() => {
        if (currentSlide < images.length - 1) {
          dispatch({ type: "NEXT_SLIDE" });
        }
      }}
      images={images}
      currentIndex={currentSlide}
      onClose={() => {
        dispatch({ type: "CLOSE_MODAL" });
      }}
      /* Add your own UI */
      // renderHeader={() => (<CustomHeader />)}
      // renderFooter={() => (<CustomFooter />)}
      // renderPrevButton={() => (<CustomLeftArrowButton />)}
      // renderNextButton={() => (<CustomRightArrowButton />)}
      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      /* Add styling */
      // className="cool-class"
      // style={{ background: "grey" }}

      /* Handle closing */
      // onClose={handleClose}
    />
  );
};
