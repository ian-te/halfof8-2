import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import Link from "gatsby-link"
import { MobileShow } from "../components/MobileHide"
import Layout from "../components/layout"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

const Content = styled.div`
  padding-top: 37px;
  font-size: 14px;
  line-height: 1.86;
  min-height: 1200px;
  section,
  header {
    display: flex;
    flex-wrap: wrap;
    padding-left: 22px;
    margin-bottom: 92px;
  }
  section,
  header {
    & > div {
      flex: 1 0 0;
      min-width: 250px;
      margin-right: 11px;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
  .case-study {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    max-width: 1600px;
    align-content: center;
  }
  .case-study > div {
    width: calc(50% - 20px);
  }
  .case-study img {
    max-width: 100%;
  }

  @media (max-width: 1024px) {
    .case-study {
      flex-direction: column;
    }
    .case-study > div {
      width: 100%;
      text-align: center;
    }
  }
  header > div {
    width: 25%;
    flex: 0 0 auto;
  }
  @media (max-width: 580px) {
    header > div {
      width: 100%;
    }
  }
`

const theme = {
  black: {
    body: "#000",
    color: "#FFF",
  },
  white: {
    body: "#FFF",
    color: "#000",
  },
}
export default function Template({ data, transition, pathContext }) {
  const node = data.allContentfulPortfolioItem.edges[0].node
  if (!node.body) return null
  return (
    <div style={transition && transition.style}>
      <Layout>
        <div>
          <style
            dangerouslySetInnerHTML={{
              __html: `body{background-color: ${node.backgroundColor}}`,
            }}
          />
          <Sidebar color={node.textColor} bgColor={node.backgroundColor} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Helmet>
            <title>{node.name} : Half of Eight</title>
            <meta
              property="og:title"
              content={`${node.name} : Half of Eight`}
            />
            <meta
              property="og:description"
              content={node.body.childMarkdownRemark.html.replace(
                /<(?:.|\n)*?>/gm,
                ""
              )}
            />
          </Helmet>
          {/* {node.videoOverlay && <Vimeo></Vimeo>} */}

          <Content
            style={{ color: node.textColor || "#000" }}
            dangerouslySetInnerHTML={{
              __html: node.body.childMarkdownRemark.html,
            }}
          />
          {/*{pathContext.prev && <ButtonContainer>
                        <Button
                            color={node.textColor}
                            to={`/project/${pathContext.prev.node.slug}`} 
                            icon="prev"
                            >
                            prev project
                        </Button>
                        <Button
                            color={node.textColor}
                            width="50%"
                            
                            to="/" >
                            to project feed
                        </Button>
                        <Button
                            color={node.textColor}
                            icon="next"
                            to={`/project/${pathContext.next.node.slug}`} >
                            next project
                        </Button>
                    </ButtonContainer>
                     */}
          <MobileShow>
            <Footer color={node.textColor} />
          </MobileShow>
        </div>
      </Layout>
    </div>
  )
}

export const pageQuery = graphql`
  query PortfolioItemQuery($id: String!) {
    allContentfulPortfolioItem(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          name
          theme
          tag
          secondaryTag
          backgroundColor
          textColor
          body {
            id
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
