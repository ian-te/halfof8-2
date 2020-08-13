import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { Logo } from "../Logo";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const options = {
  renderText: text => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
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
  console.log(">>>", ft1);
  return (
    <HeaderWrapper>
      <IconContainer>
        {actionRenderer ? (
          actionRenderer()
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
      </IconContainer>
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
    </HeaderWrapper>
  );
};

const Info = styled.div`
  font-family: neue-haas-grotesk-text, sans-serif;
  align-self: flex-start;
  font-size: 12px;
  line-height: 16px;
  margin-top: 0;


  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid #c4c4c4;
  }
  a:hover {
    color: inherit;
    text-decoration: none;
    border-bottom: none;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 22px;
    margin-bottom: 48px;
    margin-top: 0;
    width: 90%;
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
  align-items: center;
  grid-template-areas:
    "logo empty"
    "text text"
    "ft1  ft2"
    ".    ft3";

  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 640px) {
    grid-template-areas: 
      "logo text text"
      ". ft1 ft2"
      ". . ft3";
    grid-template-columns: repeat(3, 1fr);
  }
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: 
      "logo text text text"
      ". ft1 ft2 ft3" ;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: 
      "logo text text text text"
      ". ft1 ft2 ft3 .";
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas: 
      "logo text text text text text"
      ". ft1 ft2 ft3 . .";
  }
`;

const IconContainer = styled.div`
  margin: 0 auto;
  grid-area: logo;

  @media (min-width: 640px) {
    transform: scale(1.5);
  }

  @media (min-width: 1024px) {
    transform: scale(1.5);
  }

  @media (min-width: 1440px) {
    transform: scale(2);
  }

  @media (min-width: 1920px) {
    transform: scale(2);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Text = styled.h2`
  font-family: neue-haas-grotesk-text, sans-serif;
  font-size: 8vw;
  ${props => (props.dark ? `color: #fff` : `color: #000`)};
  font-weight: 400;
  letter-spacing: -0.022em;

  line-height: 1;
  grid-area: text;
  margin-left: -6px;
  margin-top: 16px;
  margin-bottom: 16px;

  -moz-font-feature-settings: "salt";
  -webkit-font-feature-settings: "salt";
  font-feature-settings: "salt";

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  @media (max-width: 360px) {
    font-size: 40px;
    margin: 0;
  }


  @media (max-width: 375px) {
    font-size: 40px;
    margin: 0;
  }
`;
