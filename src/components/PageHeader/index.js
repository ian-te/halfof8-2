import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { Logo } from "../Logo";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
import { Tag } from "../Tag";

const options = {
  renderText: text => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderNode: {
    [INLINES.EMBEDDED_ENTRY]: node => {
      const { name, identifier } = node.data.target.fields;
      return <Tag name={name["en-US"]} identifier={identifier["en-US"]} />;
    }
  }
};

const getHeaderContents = header =>
  [header[0]].map(item =>
    item.childContentfulTextSnippetTextRichTextNode
      ? documentToReactComponents(
          item.childContentfulTextSnippetTextRichTextNode.json,
          options
        )
      : item
  );

export const PageHeader = ({
  header,
  dark = false,
  actionRenderer = null,
  ft1,
  ft2,
  ft3
}) => {
  return (
    <HeaderWrapper>
      <Support1 dark={dark}>
        HALF OF EIGHT
        <br />
        エイトの半分
      </Support1>
      <Support2 dark={dark}>
        DESCRIPTION
        <br />
        デスクリプション
      </Support2>
      <Support3 dark={dark}>
        IN SHORT
        <br />
        ショート
      </Support3>

      <Text dark={dark}>{getHeaderContents(header)}</Text>

      {ft1 && (
        <Ft1>
          {documentToReactComponents(
            ft1.childContentfulTextSnippetTextRichTextNode.json,
            options
          )}
        </Ft1>
      )}
      {ft2 && (
        <Ft2>
          {documentToReactComponents(
            ft2.childContentfulTextSnippetTextRichTextNode.json,
            options
          )}
        </Ft2>
      )}
      {ft3 && (
        <Ft3>
          {documentToReactComponents(
            ft3.childContentfulTextSnippetTextRichTextNode.json,
            options
          )}
        </Ft3>
      )}

      <IconContainer>
        {actionRenderer ? (
          actionRenderer()
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
      </IconContainer>
    </HeaderWrapper>
  );
};

// MAIN TEXT

const Info = styled.div`
  font-family: neue-haas-grotesk-text, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  align-self: flex-start;
  font-size: 13px;
  line-height: 1.4;
  margin-block-end: 32px;

  animation: appear 1s ease-in;
  animation-delay: 1s;
  animation-fill-mode: both;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  ${"" /* 
  :nth-child(3) { animation-delay: 1s }
  :nth-child(4) { animation-delay: 1s }
  :nth-child(5) { animation-delay: 3s } */}

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }

  a:hover {
    color: ${props => props.theme.textColor};
    text-decoration: none;
    border-bottom: none;
    background-color: none;
  }

  @media (min-width: 640px) {
    font-size: 1.8vw;
    letter-spacing: -0.01em;
    line-height: 1.4;
    margin-top: 12px;
    width: 90%;
  }

  @media (min-width: 1024px) {
    font-size: 1.3vw;
    letter-spacing: -0.01em;
    line-height: 1.4;
    margin-top: 18px;
    width: 90%;
  }

  @media (min-width: 1440px) {
    font-size: 1vw;
    letter-spacing: -0.01em;
    line-height: 1.4;
    margin-top: 24px;
    width: 90%;
  }

  @media (min-width: 1920px) {
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;

    @media (max-width: 2000px) {
      ${'' /* margin-block-end: 32px; */}
    }

    @media (max-width: 640px) {
      ${'' /* margin-block-end: 16px; */}
    }
  }
`;

const Ft1 = styled(Info)`
  grid-area: ft1;
`;
const Ft2 = styled(Info)`
  grid-area: ft2;
`;
const Ft3 = styled(Info)`
  grid-area: ft3;
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  padding: 16px;
  ${"" /* align-items: center; */}

  grid-template-areas:
    "sup1 sup3"
    "logo empty"
    "sup2 ."
    "text text"
    "ft1  ft2";

  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 640px) {
    grid-template-areas:
      "sup3 logo ."
      "sup1 text text"
      "sup2 ft1 ft2";
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "sup1 sup2 .  sup3"
      "logo ft1 ft2 text";
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
      "sup1 sup2 . . sup3"
      "logo ft1 ft2 text text";
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      "sup1 sup2 . . . sup3"
      "logo ft1 ft2 . text text";
  }
`;

// LOGOTYPE

const IconContainer = styled.div`
  grid-area: logo;
  margin-bottom: auto;
  animation: appear 1s ease-in;
  animation-fill-mode: both;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (min-width: 640px) {
    margin-right: 0;
    margin-bottom: auto;
  }

  @media (min-width: 1024px) {
    margin-top: 0px;
    svg {
      width: 42px;
    }
  }

  @media (min-width: 1440px) {
    margin-right: 0;
    margin-top: 24px;
    svg {
      width: 62px;
    }
  }

  @media (min-width: 1920px) {
    margin-top: 24px;
  }
`;

// BIG HEADLINE WITH KANJIS

const Text = styled.h2`
  grid-area: text;
  font-family: Inter, "M PLUS 1p", "Playfair Display", sans-serif;
  font-size: 16.9vw;
  margin: 0;
  margin-top: 0px;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
  font-weight: 400;
  line-height: 1.02;
  text-align: top;
  color: ${props => props.theme.bgColor}!important;

  animation: appear 1s ease-in;
  animation-fill-mode: both;

  u {
    font-family: "Playfair Display", serif !important;
    font-weight: 400;import { Tag } from '../Tag/index';
    text-decoration: none;
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  @media (min-width: 640px) {
    font-size: 5.5vw;
    margin-top: 12px;
    margin-bottom: 0px;
  }

  @media (min-width: 1024px) {
    font-size: 4.2vw;
    margin-left: auto;
    margin-top: 8px;
    margin-bottom: 42px;
  }

  @media (min-width: 1440px) {
    font-size: 6.5vw;
    margin-left: auto;
    margin-top: 0px;
    margin-bottom: 42px;
    max-width: 100%;
  }

  @media (min-width: 1920px) {
    font-size: 6.5vw;
    margin-left: auto;
    margin-top: 0px;
    margin-bottom: 42px;
    max-width: 100%;
  }
`;

// Info text at the top

const Support = styled.div`
  font-family: inter, san-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 1.4;

  @media (min-width: 640px) {
    font-size: 10px;
  }

  @media (min-width: 1024px) {
    font-size: 10px;
    margin-top: 12px;
  }

  @media (min-width: 1440px) {
    margin-top: 16px;
    font-size: 10px;
  }
`;

const Support1 = styled(Support)`
  grid-area: sup1;
`;

const Support2 = styled(Support)`
  grid-area: sup2;
  margin-top: 24px;

  @media (min-width: 640px) {
    margin-bottom: 0px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 0px;
  }

  @media (min-width: 1440px) {
    margin-bottom: 0px;
  }
`;

const Support3 = styled(Support)`
  grid-area: sup3;

  @media (min-width: 1024px) {
    text-align: right;
    margin-left: auto;
  }
`;
