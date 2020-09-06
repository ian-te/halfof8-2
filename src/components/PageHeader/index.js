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
     {/* <Text dark={dark}>HALF<br/>OF EIGHT<br/>ポスターと<br/>環境音楽 <span>&nbsp;</span> </Text> */}
       {/* <Text dark={dark}>このページの仕掛品あります</Text> */}
      <Text dark={dark}>{getHeaderContents(header)}</Text>
      <IconContainer>
        {actionRenderer ? (
          actionRenderer()
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
      </IconContainer>
  
       
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
  font-size: 14px;
  line-height: 1.3;

  animation: appear 1s ease-in;
  animation-delay: 1s;
  animation-fill-mode: both;

  @keyframes appear { 
  0% { opacity: 0; }
  100% { opacity: 1; }
  }
${'' /* 
  :nth-child(3) { animation-delay: 1s }
  :nth-child(4) { animation-delay: 1s }
  :nth-child(5) { animation-delay: 3s } */}

  a {
    color: inherit;
    text-decoration: none;
    background-color: #FFF500;
    ${'' /* border-bottom: 1px solid #c4c4c4; */}
  }

  a:hover {
    color: inherit;
    text-decoration: none;
    border-bottom: none;
    background-color: white;
  }


  }


   @media (min-width: 640px) {
    font-size: 17px;
    letter-spacing: -0.01em;
    line-height: 1.4;
    margin-top: 12px;
    width: 90%;

  }

  @media (min-width: 1024px) {
    font-size: 17px;
    letter-spacing: -0.01em;
    line-height: 1.4;
    margin-top: 12px;
    width: 90%;
  }

  @media (min-width: 1440px) {
    font-size: 19px;
    letter-spacing: -0.01em;
    line-height: 1.4;
    margin-top: 12px;
    width: 90%;
  }

  @media (min-width: 1920px) {
   
  }


  p {
    margin-block-start: 0;
    margin-block-end: 0;

    @media (max-width: 2000px) {
    ${'' /* margin-block-start: 16px; */}
    margin-block-end:  32px;
    }

    @media (max-width: 640px) {
    ${'' /* margin-block-start: 16px; */}
    margin-block-end:  16px;
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
  ${'' /* align-items: center; */}
  grid-template-areas:
    "text text"
    "logo empty"
    "ft1  ft2";


  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 640px) {
    grid-template-areas: 
      "text ft1 ft2"
      "logo ft1 ft2";
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: 
    "text ft1 ft2 logo";
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: 
    "text text ft1 ft2 logo";
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas: 
    "text text ft1 ft2 . logo";;
  }
`;

const IconContainer = styled.div`
  grid-area: logo;
  margin-bottom: auto;

  animation: appear 1s ease-in;
  animation-fill-mode: both;

  @keyframes appear { 
  0% { opacity: 0; }
  100% { opacity: 1; }
  }
  
  svg {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 640px) {
    margin-right: auto;
    margin-bottom: auto;
  }

  @media (min-width: 1024px) {
    margin-left: auto;
  }

  @media (min-width: 1440px) {
    margin-right: 0;
    margin-left: auto;
  }

  @media (min-width: 1920px) {
    margin-right: 0;
    margin-left: auto;
  }

`;





const Text = styled.h2`
  font-family: inter, 'M PLUS 1p', sans-serif;
  font-size: 16.9vw;
  font-weight: bold;
  margin: 0;
  margin-top: 0px;
  margin-bottom: 0px;
  letter-spacing: -0.03em;

  ${props => (props.dark ? `color: #fff` : `color: #000`)};
  font-weight: 400;

  line-height: 1;
  grid-area: text;
  text-align: top;

  animation: appear 1s ease-in;
  animation-fill-mode: both;

  @keyframes appear { 
  0% { opacity: 0; }
  100% { opacity: 1; }
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
    margin-left: 0px;
    margin-top: 12px;
    margin-bottom: 42px;
  }

  @media (min-width: 1440px) {
    font-size: 7.2vw;
    margin-left: 0px;
    margin-top: 0px;
    margin-bottom: 42px;
    max-width: 100%;
  }

  @media (min-width: 1920px) {
    font-size: 122px;
    margin-left: 0px;
    margin-top: 0px;
    margin-bottom: 42px;
    max-width: 100%;
  }


`;
