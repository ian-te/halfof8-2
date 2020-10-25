import React, { useContext, Fragment, useReducer } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Item } from "../components/Item/index";
import "./index.css";
import { ImageModal, useModalState } from "../components/ImageModal";
import { Blobs } from "../components/BlobAnimation";
import { PageHeader } from "../components/PageHeader";
import { useRootReducer, ReducerContext } from "../reducers/root";
import { Filter } from "../components/Filter";

const IndexPage = ({ data }) => {
  const { header, info } = data.contentfulMainPage;

  const [state, dispatch] = useRootReducer();

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
      )
    }));

  return (
    <Fragment>
      <Blobs />
      <ReducerContext.Provider value={{ state, dispatch }}>
        <PageHeader header={header} ft1={info[0]} ft2={info[1]} ft3={info[2]} />
        <Layout>
          <SEO title={data.site.siteMetadata.title} />
          <ItemsRender items={data.contentfulMainPage.items} />
          <Filter />
        </Layout>
        <ImageModal images={modalImages} />
      </ReducerContext.Provider>
    </Fragment>
  );
};
const ItemsRender = ({ items }) => {
  let slideKey = -1;
  const {
    state: { filter }
  } = useContext(ReducerContext);

  return (
    items &&
    items.map(itemData => {
      if (itemData.lightbox) slideKey = slideKey + 1;
      if (
        filter.tag &&
        (!itemData.tags ||
          itemData.tags.find(tag => filter.tag !== tag.identifier))
      ) {
        return null;
      }
      return (
        <Item
          {...itemData}
          key={itemData.id}
          shadow={true}
          ratio={0.75}
          currentSlide={slideKey}
        />
      );
    })
  );
};

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulMainPage {
      id
      info {
        childContentfulTextSnippetTextRichTextNode {
          json
        }
      }
      header {
        id
        childContentfulTextSnippetTextRichTextNode {
          json
        }
      }
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

          tags {
            name
            identifier
          }
          fbxFile {
            file {
              url
            }
          }
          shortText {
            childMarkdownRemark {
              html
            }
          }
          displayShortText
          fbxColor
          lights
          indexBackgroundImage {
            file {
              url
            }
            localFile {
              childImageSharp {
                id
                fluid(
                  srcSetBreakpoints: [240, 320, 380, 480, 640, 1280]
                  webpQuality: 90
                  pngQuality: 80
                  jpegQuality: 90
                  jpegProgressive: true
                  cropFocus: ATTENTION
                  fit: COVER
                ) {
                  src
                  aspectRatio
                  base64
                  presentationHeight
                  presentationWidth
                  sizes
                  srcSet
                  srcWebp
                  srcSetWebp
                }
              }
            }
          }
        }
        ... on ContentfulAudio {
          id
          name
          mp3 {
            file {
              url
            }
          }
          background {
            localFile {
              childImageSharp {
                id
                fluid(
                  srcSetBreakpoints: [180, 320, 380, 480, 640, 1280]
                  webpQuality: 90
                  pngQuality: 80
                  jpegQuality: 90
                  jpegProgressive: true
                ) {
                  src
                  aspectRatio
                  base64
                  presentationHeight
                  presentationWidth
                  sizes
                  srcSet
                  srcWebp
                  srcSetWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
