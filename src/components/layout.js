/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <Main>{children}</Main>
    </div>
  )
}

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
