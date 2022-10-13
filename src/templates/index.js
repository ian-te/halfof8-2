import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Item } from "../components/Item/index";
import "../index.css";
import { ImageModal } from "../components/ImageModal";
import { useReducerContext } from "../reducers/root";
import { Header } from "../components/Header/index";
import { Player } from "../components/Player";
import { renderRichText } from "gatsby-source-contentful/rich-text";

const Caption = ({ item }) => {
  if (!item.lightboxText) return null;
  return renderRichText(item.lightboxText);
};

const IndexPage = ({ data, pageContext }) => {
  const modalImages = data.contentfulMainPage.items
    .filter((item) => !!item.lightbox)
    .map((item) => ({
      gatsbyImageData: item.indexBackgroundImage.modalImage,
      embed: item.modalEmbedUrl,
      caption: !!item.lightboxText?.raw && <Caption item={item} />,
    }));

  return (
    <Fragment>
      <Seo />
      <Header menu={data.menus.nodes[0]} />
      <Layout isBordersEnabled={data.contentfulSettings.enableItemBorders}>
        <ItemsRender
          items={data.contentfulMainPage.items}
          activeTag={pageContext.tag}
        />
      </Layout>
      <ImageModal images={modalImages} />
      <Player />
    </Fragment>
  );
};
const ItemsRender = ({ items, activeTag, isBordersEnabled }) => {
  let slideKey = -1;

  return (
    items &&
    items
      .filter(
        (item) =>
          !activeTag || item.tags.find((tag) => tag.identifier === activeTag)
      )
      .map((itemData) => {
        if (itemData.lightbox) slideKey = slideKey + 1;
        return (
          <Item
            {...itemData}
            key={itemData.id}
            visible={true}
            // visible={!activeTag || itemData.tags.includes(activeTag)}
            shadow={true}
            ratio={0.75}
            currentSlide={slideKey}
          />
        );
      })
  );
};

export const query = graphql`
  query MainPageQuery($language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulSettings {
      enableItemBorders
    }
    contentfulMainPage(node_locale: { eq: $language }) {
      id
      items {
        __typename
        ... on ContentfulPortfolioItem {
          id
          name
          slug
          externalUrl
          externalLinks
          lightbox
          gridColumns
          gridRows
          lightbox
          lightboxText {
            raw
          }
          tags {
            name
            identifier
          }
          modalEmbedUrl
          indexBackgroundImage {
            file {
              url
            }
            modalImage: gatsbyImageData(
              jpegProgressive: true
              formats: AUTO
              breakpoints: [320, 640]
              layout: CONSTRAINED
              placeholder: BLURRED
            )
            thumbImage: gatsbyImageData(
              jpegProgressive: true
              formats: AUTO
              width: 1000
              breakpoints: [320, 640]
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
        ... on ContentfulWidget {
          name
          embedUrl
          tags {
            name
            identifier
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
            albumArt: gatsbyImageData(
              jpegProgressive: true
              formats: AUTO
              width: 512
              height: 512
              layout: FIXED
              aspectRatio: 1
              placeholder: BLURRED
              resizingBehavior: CROP
            )
            thumbImage: gatsbyImageData(
              jpegProgressive: true
              formats: AUTO
              width: 1000
              breakpoints: [320, 640]
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
          waveformImage {
            file {
              url
            }
          }
        }
        ... on ContentfulTextSnippet {
          name
          textColor
          backgroundColor
          expandable
          externalUrl
          text {
            raw
          }
          tags {
            name
            identifier
          }
        }
      }
    }
    menus: allContentfulMenu(filter: { node_locale: { eq: $language } }) {
      nodes {
        leftItems {
          __typename
          ... on ContentfulTag {
            id
            name
            identifier
          }
          ... on ContentfulTextSnippet {
            id
            name
            text {
              raw
            }
          }
        }
        rightItems {
          __typename
          ... on ContentfulTextSnippet {
            id
            name
            text {
              raw
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
