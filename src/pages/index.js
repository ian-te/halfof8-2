import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Item } from "../components/Item/index";
import "./index.css";
import { ImageModal, useModalState } from "../components/ImageModal";
import { Intro, IntroWrapper } from "../components/Intro/index.js";

const applyReveal = async () => {
  const reveal = await import("scrollreveal");
  const ScrollReveal = reveal.default;
  console.log(ScrollReveal());
  ScrollReveal().reveal(".sr-item", { interval: 200 });
};
const IndexPage = ({ data }) => {
  const [{ isOpen, currentSlide }, setModalState] = useModalState();
  useEffect(() => {
    applyReveal();
  });
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
    <Layout>
      <SEO title={data.site.siteMetadata.title} />
      <ImageModal
        images={modalImages}
        setModalState={setModalState}
        isOpen={isOpen}
        currentIndex={currentSlide}
      />
      <Intro />
      {data.contentfulMainPage.items
        // .filter(
        //   itemData =>
        //     itemData.indexBackgroundImage &&
        //     !itemData.indexBackgroundImage.file.url.includes(".gif")
        // )
        .map(itemData => {
          if (itemData.lightbox) {
            slideKey = slideKey + 1;
          }
          return (
            <Item
              {...itemData}
              setModalState={setModalState}
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
            via <a href="mailto:info@halfof8.com">info@halfof8.com</a> <br />
          </p>
          <p>
            Design by <a href="https://instagram.com/halfof8">Anton Sokolov</a>{" "}
            <br />
            Development by{" "}
            <a href="https://github.com/yante" target="_blank">
              Yan Te
            </a>{" "}
            <br />
            Inter typeface by{" "}
            <a href="https://rsms.me/inter/" target="_blank">
              rsms.me
            </a>
          </p>
        </footer>
      </IntroWrapper>
    </Layout>
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
                }
              }
            }
          }
        }
        ... on ContentfulWidget {
          id
          name
          embedUrl
        }
      }
    }
  }
`;

export default IndexPage;
