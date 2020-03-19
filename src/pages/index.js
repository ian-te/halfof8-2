import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Item } from "../components/Item/index"
import "./index.css"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} />
      {data.contentfulMainPage.items.map(itemData => (
        <Item {...itemData} />
      ))}
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulMainPage {
      id
      items {
        ... on ContentfulPortfolioItem {
          id
          name
          tag
          slug
          externalUrl
          externalLinks
          isRootPage
          indexBackgroundImage {
            file {
              url
            }
            localFile {
              childImageSharp {
                id
                fluid(
                  srcSetBreakpoints: [180, 320, 640, 1280]
                  jpegQuality: 90
                  jpegProgressive: true
                  pngQuality: 90
                  quality: 90
                  webpQuality: 95
                ) {
                  src
                  aspectRatio
                  base64
                  presentationHeight
                  presentationWidth
                  sizes
                  srcSet
                  srcSetWebp
                  srcWebp
                }
              }
            }
          }
        }
        ... on ContentfulWidget {
          id
          name
          embedUrl
        }
      }
    }
  }
`

export default IndexPage
