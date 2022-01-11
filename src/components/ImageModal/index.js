import React, { useEffect } from "react";
import Lightbox from "./components/Modal";
import { useReducerContext } from "../../reducers/root";

export const ImageModal = ({ images }) => {
  const {
    state: { modal },
    dispatch,
  } = useReducerContext();
  const { isOpen, currentSlide } = modal;
  useEffect(() => {
    dispatch({ type: "INIT_MODAL", data: { totalSlides: images.length } });
  }, [images.length]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <Lightbox
      isOpen={isOpen}
      onPrev={() => {
        dispatch({ type: "PREV_SLIDE" });
      }}
      onNext={() => {
        dispatch({ type: "NEXT_SLIDE" });
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
