import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Item } from "../components/Item/index";
import "../index.css";
import { ImageModal } from "../components/ImageModal";
import { useReducerContext } from "../reducers/root";
import { Header } from "../components/Header/index";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const IndexPage = ({ data }) => {
  const modalImages = data.contentfulMainPage.items
    .filter((item) => !!item.lightbox)
    .map((item) => ({
      gatsbyImageData: item.indexBackgroundImage.modalImage,
      caption: () => {
        if (!item.lightboxText) return null;
        const textJson = JSON.parse(item.lightboxText.raw);
        return documentToReactComponents(textJson);
      },
    }));

  return (
    <Fragment>
      <Seo title={data.site.siteMetadata.title} />
      <Header menu={data.menus.nodes[0]} />
      <Layout>
        <ItemsRender items={data.contentfulMainPage.items} />
        {/* <Filter /> */}
      </Layout>
      <ImageModal images={modalImages} />
    </Fragment>
  );
};
const ItemsRender = ({ items }) => {
  let slideKey = -1;
  const {
    state: { filter },
  } = useReducerContext();

  return (
    items &&
    items.map((itemData) => {
      if (itemData.lightbox) slideKey = slideKey + 1;
      return (
        <Item
          {...itemData}
          key={itemData.id}
          visible={
            // itemData.__typename == "ContentfulTextSnippet" ||
            (filter.tag === "uncategorized" &&
              itemData.__typename === "ContentfulWidget") ||
            !(
              filter.tag &&
              (!itemData.tags ||
                itemData.tags.find((tag) => filter.tag !== tag.identifier))
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
  query MainPageQuery($language: String!) {
    site {
      siteMetadata {
        title
      }
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
