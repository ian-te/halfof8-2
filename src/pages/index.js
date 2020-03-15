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
              xl: fluid(maxWidth: 640) {
                ...GatsbyImageSharpFluid
              }
              l: fluid(maxWidth: 480) {
                ...GatsbyImageSharpFluid
              }
              s: fluid(maxWidth: 320) {
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
