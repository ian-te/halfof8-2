import React from "react";
import styled, { css } from "styled-components";

const animations = css`
  @keyframes ball0 {
    from {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(21vw, -10vw);
    }
    50% {
      transform: translate(-10vw, 0);
    }
    75% {
      transform: translate(100vw, 10vw);
    }
    to {
      transform: translate(0, 0);
    }
  }
  @keyframes ball1 {
    from {
      transform: translate(100vw, 0);
    }
    25% {
      transform: translate(10vw, 10vw);
    }
    50% {
      transform: translate(50vw, 0);
    }
    75% {
      transform: translate(21vw, -10vw);
    }
    to {
      transform: translate(100vw, 0);
    }
  }
`;

const Blob = styled.div`
  ${animations};
  width: 50vw;
  height: 50vw;
  background-image: radial-gradient(
    circle,
    rgba(255, 0, 0, 1) 0%,
    rgba(0, 212, 255, 0) 66%
  );
  position: absolute;
  animation: ${props => `ball${props.num}`} 30s linear infinite;
`;
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

export const Blobs = ({ blobs = 2 }) => (
  <Wrapper>
    {Array.from(Array(blobs)).map((item, key) => (
      <Blob num={key} />
    ))}
  </Wrapper>
);
