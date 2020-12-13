import React, { useContext, Fragment } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Item } from "../components/Item/index";
import "./index.css";
import { ImageModal } from "../components/ImageModal";
import { Blobs } from "../components/BlobAnimation";
import { PageHeader } from "../components/PageHeader";
import { Filter } from "../components/Filter";
import { useReducerContext } from "../reducers/root";

const IndexPage = ({ data }) => {
  const { header, info } = data.contentfulMainPage;

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
      {/* <Blobs /> */}
      <PageHeader header={header} ft1={info[0]} ft2={info[1]} ft3={info[2]} ft4={info[3]} />
      <Layout>
        <SEO title={data.site.siteMetadata.title} />
        <ItemsRender items={data.contentfulMainPage.items} />
        <Filter />
      </Layout>
      <ImageModal images={modalImages} />
    </Fragment>
  );
};
const ItemsRender = ({ items }) => {
  let slideKey = -1;
  const {
    state: { filter }
  } = useReducerContext();

  return (
    items &&
    items.map(itemData => {
      if (itemData.lightbox) slideKey = slideKey + 1;
      return (
        <Item
          {...itemData}
          key={itemData.id}
          visible={
            !(
              filter.tag &&
              (!itemData.tags ||
                itemData.tags.find(tag => filter.tag !== tag.identifier))
            )
          }
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
            fluid {
              src
              aspectRatio
              base64
              sizes
              srcSet
              srcWebp
              srcSetWebp
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
          tags {
            name
            identifier
          }
          background {
            file {
              url
            }
            fluid {
              src
              aspectRatio
              base64
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
`;

export default IndexPage;
