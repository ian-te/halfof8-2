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
  align-self: flex-start;
  font-size: 12px;
  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid #c4c4c4;
  }
  @media (min-width: 1024px) {
    font-size: 20px;
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
    "logo logo"
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
      "logo text text text empty"
      ". ft1 ft2 ft3 .";
  }
  @media (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas: 
      "logo text text text empty empty"
      ". ft1 ft2 ft3 . .";
  }
`;

const IconContainer = styled.div`
  margin: 0 auto;
  max-width: 150px;
  grid-area: logo;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Text = styled.h2`
  font-size: 3vw;
  ${props => (props.dark ? `color: #fff` : `color: #000`)};
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.1;
  grid-area: text;
  p {
    margin-top: 0;
    margin-bottom: 0;
  }
  @media (max-width: 360px) {
    font-size: 6vw;
  }
`;
