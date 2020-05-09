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
  width: 68px;
  height: 68px;
  margin-top: -34px;
  margin-left: -34px;
  left: 50%;
  top: 50%;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @media (max-width: 480px) {
    left: 16px;
    top: 16px;
    margin-left: 0;
    margin-top: 0;
  }

  &:hover {
    color: #167dff;
    svg path {
      fill: #167dff !important;
    }
  }
`;
