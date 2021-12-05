import { lighten } from "polished";
import React from "react";
import styled from "styled-components";

export const Progress = ({ progress }) => {
  return (
    <Wrapper>
      <Bar
        style={{ transform: `translateX(${progress * 100}%)` }}
        progress={progress}
      ></Bar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 4px;
  background-color: ${({ theme: { textColor } }) => lighten(0.5, textColor)};
  flex-shrink: 0;
  flex-grow: 2;
  overflow: hidden;
  margin-right: 8px;
`;

const Bar = styled.div`
  position: absolute;
  left: 0;
  height: 4px;
  width: 100%;
  left: -100%;
  /* transition: transform 0.8s linear; */
  background-color: ${({ theme: { textColor } }) => textColor};
`;
