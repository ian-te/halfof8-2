import React, { useEffect, Fragment, useReducer } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Item } from "../components/Item/index";
import "./index.css";
import { ImageModal, useModalState } from "../components/ImageModal";
import { Intro, IntroWrapper } from "../components/Intro/index.js";
import {
  PlayerContext,
  reducer as playerReducer,
  initialState as initialPlayerState
} from "../reducers/Player";
import { PageHeader } from "../components/PageHeader";

// const applyReveal = async () => {
//   const reveal = await import("scrollreveal");
//   const ScrollReveal = reveal.default;
//   ScrollReveal().reveal(".sr-item", { interval: 50 });
// };

export const ModalContext = React.createContext();

const initialState = {
  isOpen: false,
  currentSlide: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        currentSlide: action.data.slide
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;
  }
}

const IndexPage = ({ data }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [playerState, playerDispatch] = useReducer(
    playerReducer,
    initialPlayerState
  );

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

  let slideKey = -1;

  return (
    <Fragment>
      <PlayerContext.Provider
        value={{
          state: playerState,
          dispatch: playerDispatch
        }}
      >
        <ModalContext.Provider value={{ state, dispatch }}>
          <PageHeader
            header={header}
            ft1={info[0]}
            ft2={info[1]}
            ft3={info[2]}
          />
          <Layout>
            <SEO title={data.site.siteMetadata.title} />
            {data.contentfulMainPage.items
              // .filter(itemData => !itemData.fbxFile)
              .map(itemData => {
                if (itemData.lightbox) slideKey = slideKey + 1;
                return (
                  <Item
                    {...itemData}
                    key={itemData.id}
                    shadow={true}
                    ratio={0.75}
                    currentSlide={slideKey}
                  />
                );
              })}
            
          </Layout>
          <ImageModal images={modalImages} />
        </ModalContext.Provider>
      </PlayerContext.Provider>
    </Fragment>
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
          fbxFile {
            file {
              url
            }
          }
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
