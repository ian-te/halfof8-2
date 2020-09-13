import React from "react";
import styled from "styled-components";

export const Text = ({ html }) => {
  return <TextInner dangerouslySetInnerHTML={{ __html: html }}></TextInner>;
};

const TextInner = styled.div`
  font-size: 16px;
  z-index: 30;
  position: relative;
  padding: 16px;
  font-size: 20px;
  p {
    padding: 0;
    margin: 0;
  }
`;
