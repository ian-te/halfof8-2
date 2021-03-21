import React from "react";
import styled from "styled-components";

export const Text = ({ html }) => {
  return <TextInner dangerouslySetInnerHTML={{ __html: html }}></TextInner>;
};

const TextInner = styled.div`

  z-index: 30;
  position: absolute;
  color: black;

  p {
    padding: 0;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  @media (min-width: 360px) {
    bottom: 8px;
    left: 8px;
  }

  @media (min-width: 640px) {
    bottom: 16px;
    left: 16px;
  }

  @media (min-width: 1024px) {
    bottom: 16px;
    left: 16px;
  }

  @media (min-width: 1440px) {
    bottom: 16px;
    left: 16px;
  }


`;
