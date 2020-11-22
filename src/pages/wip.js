import React, { useMemo } from "react";
import { ImageModal } from "../components/ImageModal";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Item } from "../components/Item/index.js";
import { PageHeader } from "../components/PageHeader";

export default ({ data }) => {
  const { images: initialImages, header, info } = data.contentfulWip;
  const images = useMemo(() => initialImages.reverse(), [initialImages]);

  const modalImages = images.map(item => ({
    src: item.file.url
  }));
  return (
    <div>
      <PageHeader header={header} ft1={info[0]} ft2={info[1]} dark></PageHeader>

      <Layout>
        {images.map((image, key) => {
          return (
            <Item
              lightbox={true}
              visible={true}
              indexBackgroundImage={image}
              key={key}
              ratio={0.562}
              currentSlide={key}
            ></Item>
          );
        })}
      </Layout>
      <ImageModal images={modalImages} />
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
`;
