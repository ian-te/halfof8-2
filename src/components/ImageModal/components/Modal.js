import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ModalArrow from "../../Icons/ModalArrow";
import ModalClose from "../../Icons/ModalClose";
import { useHotkeys } from "react-hotkeys-hook";

export default ({
  currentIndex,
  isOpen,
  images,
  onPrev,
  onNext,
  onClose,
  ...props
}) => {
  if (currentIndex == -1 || !isOpen) return null;
  const image = getImage(images[currentIndex].gatsbyImageData);
  useHotkeys(
    "left",
    () => {
      onPrev();
    },
    [currentIndex, isOpen]
  );
  useHotkeys(
    "right",
    () => {
      onNext();
    },
    [currentIndex, isOpen]
  );
  useHotkeys(
    "esc",
    () => {
      onClose();
    },
    [currentIndex, isOpen]
  );

  return (
    isOpen &&
    currentIndex > -1 && (
      <Wrapper>
        <Image>
          <GatsbyImage
            image={image}
            objectFit="contain"
            objectPosition="50% 50%"
            placeholder="none"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </Image>
        <Controls>
          <button onClick={onPrev}>
            <ModalArrow width="100%" height="100%" direction="left" />
          </button>
          <button onClick={onNext}>
            <ModalArrow width="100%" height="100%" direction="right" />
          </button>
        </Controls>
        <Controls2>
          <button onClick={onClose}>
            <ModalClose width="100%" height="100%" />
          </button>
        </Controls2>
        <Text>{images[currentIndex].caption()}</Text>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  display: grid;
  position: fixed;
  z-index: 10000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  color: #fff;
  grid-template-columns: 1fr;
  grid-template-areas:
    "controls"
    "image"
    "text";
  ${'' /* grid-template-rows: 32px min-content 1fr; */}
  overflow-y: scroll;
  grid-gap: 16px;

  @media (min-width: 640px) {
    grid-gap: 32px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 32px 1fr;
    grid-template-areas:
      "controls controls2"
      "image image"
      "text text";
    overflow-y: visible;
  }

  @media (min-width: 1024px) {
    grid-gap: 32px;
    grid-template-columns: 216px 1fr 216px;
    grid-template-rows: 64px 1fr;
    grid-template-areas:
      "controls image controls2"
      "controls image text";
    overflow-y: visible;
  }
`;

const Image = styled.div`
  grid-area: image;
  max-height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Text = styled.div`
  grid-area: text;
  color: #fff;
  max-width: 640px;
  h3 {
    margin-top: 0;
  }
  a {
    color: #fff;
  }
  margin: 8px 8px 0;
  font-size: 20px;
  line-height: 1.4;
  @media (min-width: 1024px) {
    margin: 0;
    font-size: 1.5vw;
    overflow-y: auto;
  }
  @media (min-width: 1200px) {
    font-size: 1vw;
  }
`;

const Controls = styled.div`
  grid-area: controls;
  display: grid;
  grid-template-columns: 32px 32px;
  justify-items: left;
  grid-gap: 12px;
  margin: 8px 8px 0;



  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    &:hover {
    svg path {
      stroke: red !important;
      transition: 0.5s ease;
    }
  }
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 64px 64px;
    margin-top: 12px;
    margin-right: 12px;
    button {
      width: 64px;
      height: 64px;
    }
  }
`;

const Controls2 = styled.div`
  grid-area: controls2;
  justify-items: right;
  display: flex;
  justify-content: flex-end;
  margin: 8px 8px 0;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    &:hover {
    svg path {
      stroke: red !important;
      transition: 0.5s ease;
    }
    }
  }

  @media (min-width: 1024px) {
    margin-top: 12px;
    margin-right: 12px;
    button {
      width: 64px;
      height: 64px;
    }
  }
`;
