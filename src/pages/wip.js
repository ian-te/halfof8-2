import React, { useReducer, useContext, useMemo } from "react";
import { Intro, IntroWrapper } from "../components/Intro/index.js";
import { ImageModal, useModalState } from "../components/ImageModal";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { Item } from "../components/Item/index.js";
import { ModalContext } from "./index.js";
import { PageHeader } from "../components/PageHeader";
import BackArrow from "../components/Icons/BackArrow.js";
import { initial } from "lodash";

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

export default ({ data }) => {
  const { images: initialImages, header, info} = data.contentfulWip;
  const images = useMemo(() => initialImages.reverse(), [initialImages]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const modalImages = images.map(item => ({
    src: item.file.url
  }));
  return (
    <div>
      <PageHeader
        header={header}
        ft1={info[0]}
        ft2={info[1]}
        dark
        
      >
      </PageHeader>

      <ModalContext.Provider value={{ state, dispatch }}>
        <Layout>
          {images.map((image, key) => {
            return (
              <Item
                lightbox={true}
                indexBackgroundImage={image}
                key={key}
                ratio={0.562}
                currentSlide={key}
              ></Item>
            );
          })}
        </Layout>
        <ImageModal images={modalImages} />
      </ModalContext.Provider>

    </div>
  );
};

export const query = graphql`
  query WIPQuery {
    contentfulWip {
      header {
        childContentfulTextSnippetTextRichTextNode {
          json
        }
      }

      info {
        childContentfulTextSnippetTextRichTextNode {
          json
        }
      }
    
      images {
        file {
          url
          fileName
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
  }
`;
