import React from "react";
import styled from "styled-components";
import { Arrow } from "../Icons/Arrow";
import { Expand } from "../Icons/Expand";
import { NewWindow } from "../Icons/NewWindow";

const getIcon = item => {
  switch (true) {
    case !!item.lightbox:
      return <Expand />;
    case !!item.externalUrl:
      return <NewWindow width={24} />;
    default:
      return <Arrow />;
  }
};

const IconBase = ({ item, className, ...props }) => {
  switch (true) {
    default:
      return <div className={className}>{getIcon(item)}</div>;
  }
};

export const Icon = styled(IconBase)`
  position: absolute;
  background-color: #fff;
  border-radius: 100%;
  left: 16px;
  bottom: 16px;
  width: 52px;
  height: 52px;
  margin-top: auto;
 
  svg {
    width: 20px;
    height: 20px;
  }

  display: none;
  justify-content: center;
  align-items: center;
  z-index: 2;

  ${'' /* box-shadow: 0px 1.24527px 2.46286px rgba(0, 0, 0, 0.0562291), 0px 2.99255px 5.91859px rgba(0, 0, 0, 0.0807786), 0px 5.6347px 11.1442px rgba(0, 0, 0, 0.1), 0px 10.0513px 19.8793px rgba(0, 0, 0, 0.119221), 0px 18.7999px 37.1821px rgba(0, 0, 0, 0.143771), 0px 45px 89px rgba(0, 0, 0, 0.2);   */}

  animation: popping 0.3s ease-in;
  animation-fill-mode: both;

  @media (min-width: 1024px) {
    width: 68px;
    height: 68px;
    margin-top: -34px;
    margin-left: -34px;
    left: 50%;
    top: 50%;

    svg {
    width: 24px;
    height: 24px;
  }

  }

  &:hover {
    color: #0029FF;
  
    svg path {
      fill: #0029FF !important;
    }
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
