import React from "react";
import styled from "styled-components";

const Layout = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const LayoutStyled = styled(Layout)`
  display: grid;
  grid-template-columns: 1fr 5fr;
  max-width: 1920px;
  margin: 0 auto;
  & > div:first-child {
    min-width: 250px;
  }
  @media (max-width: 580px) {
    display: block;
    & > div:first-child {
      width: 100%;
      min-width: 250px;
    }
  }
`;

export default LayoutStyled;
