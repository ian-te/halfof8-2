import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Item } from "../components/Item/index"
import "./index.css"
import { ImageModal, useModalState } from "../components/ImageModal"

const IndexPage = ({ data }) => {
  const [{ isOpen, currentSlide }, setModalState] = useModalState()
  const modalImages = data.contentfulMainPage.items
    .filter(item => !!item.lightbox)
    .map(item => ({
      src: item.indexBackgroundImage.file.url,
      caption: (
        <span>
          <b>{item.name}</b>
          <br />
          {item.tag}
        </span>
      ),
    }))

  let slideKey = -1

  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} />
      <ImageModal
        images={modalImages}
        setModalState={setModalState}
        isOpen={isOpen}
        currentIndex={currentSlide}
      />
      {data.contentfulMainPage.items.map(itemData => {
        if (itemData.lightbox) {
          slideKey = slideKey + 1
        }
        return (
          <Item
            {...itemData}
            setModalState={setModalState}
            currentSlide={slideKey}
          />
        )
      })}
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
          lightbox
          indexBackgroundImage {
            file {
              url
            }
            localFile {
              childImageSharp {
                id
                fluid(
                  srcSetBreakpoints: [180, 320, 380, 480, 640, 1280]
                  webpQuality: 70
                  pngQuality: 70
                  jpegQuality: 70
                  jpegProgressive: true
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
