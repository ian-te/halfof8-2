import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Item } from "../components/Item"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} />
      {data.allContentfulPortfolioItem.nodes.map(itemData => (
        <Item {...itemData} />
      ))}
      <button onClick={() => console.log(data)}>test</button>
    </Layout>
  )
}

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPortfolioItem(
      limit: 1000
      sort: { fields: order, order: ASC }
    ) {
      nodes {
        name
        width
        indexBackgroundImage {
          localFile {
            id
            childImageSharp {
              fluid(
                fit: COVER
                maxWidth: 640
                srcSetBreakpoints: [180, 320, 640, 1280]
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        order
      }
    }
  }
`

export default IndexPage
