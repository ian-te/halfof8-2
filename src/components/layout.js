/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div>
      <Main>{children}</Main>
    </div>
  );
};

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0px;
  padding: 0px;

  animation: appear 1s ease-in;
  animation-fill-mode: both;
  animation-delay: 2s;

  @keyframes appear { 
	0% { top:-800px; opacity: 0; }
	100% { top:0px; opacity: 1}
}

  }


  @media (min-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
