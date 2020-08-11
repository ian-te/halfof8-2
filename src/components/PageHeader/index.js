import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { Logo } from "../Logo";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const getHeaderContents = header =>
  [header[0]].map(item =>
    documentToReactComponents(
      item.childContentfulTextSnippetTextRichTextNode.json
    )
  );

export const PageHeader = ({ header, dark = false, actionRenderer = null }) => {
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
      <Ft1>1</Ft1>
      <Ft2>1</Ft2>
      <Ft3>1</Ft3>
    </HeaderWrapper>
  );
};

const Ft1 = styled.div`
  grid-area: ft1;
`;
const Ft2 = styled.div`
  grid-area: ft2;
`;
const Ft3 = styled.div`
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
`;
