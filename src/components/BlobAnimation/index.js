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
    circle,
    rgba(255, 0, 0, 1) 0%,
    rgba(236, 234, 228, 0) 66%
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
