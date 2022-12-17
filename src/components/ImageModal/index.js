import React, { useEffect } from "react";
import Lightbox from "./components/Modal";
import { useReducerContext } from "../../reducers/root";
import { useLocation } from "@reach/router";
import {
  getSlideFromHash,
  removeHash,
  setWindowHash,
} from "../../helpers/setWindowHash";

export const ImageModal = ({ images }) => {
  const {
    state: { modal },
    dispatch,
  } = useReducerContext();
  const { isOpen, currentSlide } = modal;
  const { hash } = useLocation();
  useEffect(() => {
    dispatch({ type: "INIT_MODAL", data: { totalSlides: images.length } });
  }, [images.length]);

  useEffect(() => {
    const slide = getSlideFromHash(hash);
    if (parseInt(slide, 10) === -1) return;
    dispatch({ type: "OPEN_MODAL", data: { slide } });
  }, [hash]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setWindowHash(currentSlide);
    } else {
      document.body.style.overflow = "auto";
      removeHash();
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
