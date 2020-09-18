import React from "react";
import styled from "styled-components";

export const Text = ({ html }) => {
  return <TextInner dangerouslySetInnerHTML={{ __html: html }}></TextInner>;
};

const TextInner = styled.div`
  font-size: 14px;
  line-height: 1.3;
  z-index: 30;
  position: relative;
  padding: 16px;


  p {
    padding: 0;
    margin: 0;
  }


  @media (min-width: 640px) {
    font-size: 17px;
    letter-spacing: -0.01em;
    line-height: 1.4;
    padding: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 14px;
    letter-spacing: -0.01em;
    line-height: 1.4;
    padding: 16px;
  }


  @media (min-width: 1440px) {
    font-size: 19px;
    letter-spacing: -0.01em;
    line-height: 1.4;
    padding: 22px;
  }


`;
