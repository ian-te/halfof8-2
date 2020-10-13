import React from "react";
import styled from "styled-components";

export const Text = ({ html }) => {
  return <TextInner dangerouslySetInnerHTML={{ __html: html }}></TextInner>;
};

const TextInner = styled.div`
  font-size: 13px !important;
  line-height: 1.3;
  z-index: 30;
  position: absolute;
  color: black;



  p {
    padding: 0;
    margin: 0;
  }

  @media (min-width: 360px) {
    font-size: 13px !important;
  line-height: 1.3;
    bottom: 16px;
    left: 16px;
  }

  @media (min-width: 640px) {
    font-size: 1.8vw !important;
    letter-spacing: -0.01em;
    line-height: 1.4;
    top: 16px;
    left: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 1.3vw !important;
    letter-spacing: -0.01em;
    line-height: 1.4;
    top: 16px;
    left: 16px;
  }


  @media (min-width: 1440px) {
    font-size: 1vw !important;
    letter-spacing: -0.01em;
    line-height: 1.4;
    top: 22px;
    left: 22px;
  }


`;
