import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Item } from "../components/Item/index";
import "../index.css";
import { ImageModal } from "../components/ImageModal";
import { useReducerContext } from "../reducers/root";
import { Header } from "../components/Header/index";

const IndexPage = ({ data }) => {
  const modalImages = data.contentfulMainPage.items
    .filter((item) => !!item.lightbox)
    .map((item) => ({
      src: item.indexBackgroundImage.file.url,
      caption: (
        <span>
          <b>{item.name}</b>
          <br />
          {item.tag}
        </span>
      ),
    }));

  return (
    <Fragment>
      <SEO title={data.site.siteMetadata.title} />
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
            itemData.__typename == "ContentfulTextSnippet" ||
            (filter.tag === "uncategorized" &&
              itemData.__typename == "ContentfulWidget") ||
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
  query MainPageQuery($locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulMainPage(node_locale: { eq: $locale }) {
      id
      items {
        __typename
        ... on ContentfulWip {
          slug
          text: descriptionInList {
            raw
          }
        }
        ... on ContentfulPortfolioItem {
          id
          name
          tag
          slug
          externalUrl
          externalLinks
          isRootPage
          lightbox
          gridColumns
          gridRows
          tags {
            name
            identifier
          }
          shortText {
            childMarkdownRemark {
              html
            }
          }
          displayShortText
          indexBackgroundImage {
            file {
              url
            }
            fluid(maxWidth: 1600) {
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
        ... on ContentfulWidget {
          name
          embedUrl
          width
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
          text {
            raw
            # references {
            #   id
            #   __typename
            #   contentful_id
            #   ... on ContentfulTag {
            #     name
            #     identifier
            #   }
            # }
          }
        }
      }
    }
    menus: allContentfulMenu(filter: { node_locale: { eq: $locale } }) {
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
        # rightItems {
        #   __typename
        #   ... on ContentfulTag {
        #     id
        #     name
        #   }
        #   ... on ContentfulTextSnippet {
        #     id
        #     name
        #   }
        # }
      }
    }
  }
`;

export default IndexPage;
