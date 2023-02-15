import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ModalArrow from "../../Icons/ModalArrow";
import ModalClose from "../../Icons/ModalClose";
import { useHotkeys } from "react-hotkeys-hook";
import { IframeAsync } from "../../Item/IframeAsync";

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
  const Caption = () => images[currentIndex].caption;

  return (
    isOpen &&
    currentIndex > -1 && (
      <Wrapper>
        <Main>
          <Image>
            {images[currentIndex].embed ? (
              <IframeAsync
                title={`Sketchfab – ${images[currentIndex].name}`}
                src={`${images[currentIndex].embed}`}
                width="100%"
                height="100%"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
              />
            ) : (
              <GatsbyImage
                image={image}
                objectFit="contain"
                objectPosition="50% 50%"
                placeholder="none"
                style={{ aspectRatio: "3/4" }}
              />
            )}
          </Image>
          {images[currentIndex].caption && (
            <Text>
              <Caption />
            </Text>
          )}
        </Main>

        <LeftBtn onClick={onPrev}>
          <ModalArrow width="100%" height="100%" direction="left" />
        </LeftBtn>
        <RightBtn onClick={onNext}>
          <ModalArrow width="100%" height="100%" direction="right" />
        </RightBtn>

        <Close onClick={onClose}>
          <ModalClose width="100%" height="100%" />
        </Close>
      </Wrapper>
    )
  );
};

const Close = styled.button`
  position: absolute;
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 1000;
  right: 20px;
  top: 20px;
  width: 30px;
  @media (min-width: 768px) {
    right: 40px;
    top: 60px;
    width: 60px;
  }
`;

const LeftBtn = styled.button`
  position: absolute;
  appearance: none;
  border: none;
  background: none;
  left: 20px;
  top: 50vh;
  width: 50px;
  @media (min-width: 640px) {
    left: 40px;
    top: 50%;
    width: 60px;
  }
  cursor: pointer;
  z-index: 10;
`;

const RightBtn = styled.button`
  position: absolute;
  appearance: none;
  border: none;
  background: none;
  right: 20px;
  top: 50vh;
  width: 50px;
  @media (min-width: 640px) {
    right: 40px;
    top: 50%;
    width: 60px;
  }
  cursor: pointer;
  z-index: 10;
`;

const Main = styled.div`
  flex-direction: column;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: 10000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  color: #fff;
  overflow-y: scroll;
  grid-gap: 16px;

  @media (min-width: 640px) {
    overflow-y: visible;
    display: flex;
    align-items: center;
  }

  @media (min-width: 1024px) {
    overflow-y: visible;
  }
`;

const IframeStyled = styled(IframeAsync)``;

const Image = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 100%;
  height: 100vh;
  height: 80vh;
  width: 100%;
  flex-shrink: 1;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  iframe {
    min-height: 80vh;
  }
  @media (min-width: 640px) {
    max-width: 80vw;
    max-height: 80vh;
  }
  @media (min-width: 1024px) {
    height: 100vh;
    max-height: 100vh;
    width: 50vw;
  }
`;

const Text = styled.div`
  color: #fff;
  box-sizing: border-box;
  h3 {
    margin-top: 0;
  }
  a {
    color: #fff;
  }
  font-size: 20px;
  line-height: 1.4;
  padding: 20px;
  flex-grow: 0;
  @media (min-width: 1024px) {
    margin: 0;
    font-size: 1.5vw;
    overflow-y: auto;
    width: 50vw;
    padding: 60px;
  }
  @media (min-width: 1200px) {
    font-size: 1vw;
  }
`;

const Controls = styled.div`
  justify-items: space-between;
  gap: 12px;
  position: absolute;
  left: 0;
  right: 0;
  top: calc(50% - 50px);
  height: 50%;
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
