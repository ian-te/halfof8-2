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

const applyReveal = async () => {
  const reveal = await import("scrollreveal");
  const ScrollReveal = reveal.default;
  ScrollReveal().reveal(".sr-item", { interval: 50 });
};

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

  useEffect(() => {
    applyReveal();
  }, [data]);

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
          <Layout>
            <SEO title={data.site.siteMetadata.title} />
            <Intro />
            {data.contentfulMainPage.items
              // .filter(itemData => !itemData.fbxFile)
              .map(itemData => {
                if (itemData.lightbox) slideKey = slideKey + 1;
                return (
                  <Item
                    {...itemData}
                    key={itemData.id}
                    currentSlide={slideKey}
                  />
                );
              })}
            <IntroWrapper>
              <footer>
                <p>
                  8の半
                  <br />
                  &copy; 2012 – {new Date().getFullYear()},
                </p>
                <p>
                  Car does not move
                  <br />
                  till we are all buckled up, <br />
                  so keep in touch <br />
                  via <a href="mailto:info@halfof8.com">
                    info@halfof8.com
                  </a>{" "}
                  <br />
                </p>
                <p>
                  Design by{" "}
                  <a href="https://instagram.com/halfof8">Anton Sokolov</a>
                  <br />
                  Development by{" "}
                  <a href="https://github.com/yante" target="_blank">
                    Yan Te
                  </a>{" "}
                  <br />
                  Set in{" "}
                  <a
                    href="https://commercialtype.com/catalog/neue_haas_grotesk"
                    target="_blank"
                  >
                    Neue Haas Grotesk
                  </a>
                </p>
              </footer>
            </IntroWrapper>
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
