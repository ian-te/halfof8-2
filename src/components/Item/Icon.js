import React from "react";
import styled from "styled-components";
import { Arrow } from "../Icons/Arrow";
import { Expand } from "../Icons/Expand";
import { NewWindow } from "../Icons/NewWindow";

const getIcon = (item) => {
  switch (true) {
    case !!item.lightbox:
      return <Expand />;
    case !!item.externalUrl:
      return <NewWindow width={24} />;
    default:
      return null;
  }
};

const IconBase = ({ item, className, ...props }) => {
  switch (true) {
    case !!item.lightbox:
    case !!item.externalUrl:
      return <div className={className}>{getIcon(item)}</div>;
    default:
      return null;
  }
};

export const Icon = styled(IconBase)`
  position: absolute;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  ${'' /* svg path {
    fill: ${(props) => props.theme.textColor};
  } */}
  
  border-radius: 100%;

  width: 100px;
  height: 100px;

  left: 50%;
  top: 50%;
  margin-top: -50px;
  margin-left: -50px;

  svg {
    width: 32px;
    height: 32px;
  }

  display: none;
  justify-content: center;
  align-items: center;
  z-index: 2;

  animation: popping 0.3s ease-in;
  animation-fill-mode: both;


  &:hover {
    svg path {
      stroke: white !important;
    }
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
  }

  @keyframes popping {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
