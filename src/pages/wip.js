import React, { useMemo } from "react";
import { ImageModal } from "../components/ImageModal";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Item } from "../components/Item/index.js";
import { PageHeader } from "../components/PageHeader";
import { ReducerContext, useRootReducer } from "../reducers/root.js";

export default ({ data }) => {
  const { images: initialImages, header, info } = data.contentfulWip;
  const images = useMemo(() => initialImages.reverse(), [initialImages]);

  const [state, dispatch] = useRootReducer();

  const modalImages = images.map(item => ({
    src: item.file.url
  }));
  return (
    <div>
      <PageHeader header={header} ft1={info[0]} ft2={info[1]} dark></PageHeader>

      <ReducerContext.Provider value={{ state, dispatch }}>
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
      </ReducerContext.Provider>
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
