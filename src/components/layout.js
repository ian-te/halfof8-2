/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Layout = ({ children, isBordersEnabled, activeTag }) => {
  return (
    <div>
      <Main isBordersEnabled={isBordersEnabled} activeTag={activeTag}>
        {children}
      </Main>
    </div>
  );
};

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-flow: dense;
  padding: 0px;

  & > * {
    animation: fadein 0.5s ease-in;
    animation-fill-mode: both;
    animation-delay: 2s;
  }

  ${Array.from(Array(20).keys()).map(
    (key) => `& > :nth-child(${key}) {animation-delay: ${(key + 1) / 4}s;}`
  )}

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  grid-gap: ${(props) => (props.isBordersEnabled ? "3px" : "0px")};

  @media (min-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${(props) => (props.isBordersEnabled ? "4px" : "0px")};
  }
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    ${(p) =>
      p.activeTag === "sculptures"
        ? `grid-template-columns: repeat(3, 1fr);`
        : `grid-template-columns: repeat(4, 1fr);`}
  }
  @media (min-width: 1440px) {
    ${(p) =>
      p.activeTag === "sculptures"
        ? `grid-template-columns: repeat(4, 1fr);`
        : `grid-template-columns: repeat(5, 1fr);`}
    grid-gap: ${(props) => (props.isBordersEnabled ? "0.1vw" : "0px")};
  }
  @media (min-width: 1920px) {
    ${(p) =>
      p.activeTag === "sculptures"
        ? `grid-template-columns: repeat(5, 1fr);`
        : `grid-template-columns: repeat(6, 1fr);`}
  }
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
