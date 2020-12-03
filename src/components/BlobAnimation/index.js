import React from "react";
import styled, { css } from "styled-components";

const animations = css`
  @media (min-width: 360px) {
    @keyframes ball0 {
      from {
        transform: translate(-100vw, -50vw);
      }
      to {
        transform: translate(100vw, 0vw);
      }
    }

    @keyframes ball1 {
      from {
        transform: translate(-110vw, 250vw);
      }
      to {
        transform: translate(100vw, 0vw);
      }
    }
  }

  @media (min-width: 640px) {
    @keyframes ball0 {
      from {
        transform: translate(-15vw, -15vw);
      }
      to {
        transform: translate(70vw, 10vw);
      }
    }

    @keyframes ball1 {
      from {
        transform: translate(70vw, 10vw);
      }
      to {
        transform: translate(-15vw, -15vw);
      }
    }
  }
`;

const Blob = styled.div`
  ${animations};

  @media (min-width: 360px) {
    width: 200vw;
    height: 200vw;
  }

  @media (min-width: 640px) {
    width: 60vw;
    height: 60vw;
  }

  background-image: radial-gradient(
    50% 50% at 50% 50%,
    #c20808 0%,
    rgba(195, 11, 11, 0.987259) 8.59%,
    rgba(197, 19, 19, 0.951407) 17.48%,
    rgba(199, 32, 31, 0.896) 26.53%,
    rgba(202, 48, 47, 0.824593) 35.61%,
    rgba(205, 67, 65, 0.740741) 44.59%,
    rgba(209, 88, 86, 0.648) 53.34%,
    rgba(213, 110, 107, 0.549926) 61.73%,
    rgba(217, 132, 129, 0.450074) 69.63%,
    rgba(221, 155, 151, 0.352) 76.9%,
    rgba(225, 176, 171, 0.259259) 83.41%,
    rgba(229, 194, 189, 0.175407) 89.03%,
    rgba(232, 211, 205, 0.104) 93.63%,
    rgba(234, 223, 217, 0.0485926) 97.08%,
    rgba(235, 231, 225, 0.0127407) 99.25%,
    rgba(236, 234, 228, 0) 100%
  );

  position: absolute;
  animation: ${props => `ball${props.num}`} 200s linear infinite;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  height: 200%;
`;

export const Blobs = ({ blobs = 2 }) => (
  <Wrapper>
    {Array.from(Array(blobs)).map((item, key) => (
      <Blob num={key} />
    ))}
  </Wrapper>
);
