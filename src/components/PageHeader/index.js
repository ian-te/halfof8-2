import React from "react";
import styled from "styled-components";
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

export const PageHeader = ({ ft1, ft2, ft3, ft4 }) => {
  return (
    <HeaderWrapper>
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

      {ft4 && (
        <Ft4>
          {documentToReactComponents(
            ft4.childContentfulTextSnippetTextRichTextNode.json,
            options
          )}
        </Ft4>
      )}

      {/* 
      <IconContainer>
        {actionRenderer ? (
          actionRenderer()
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
      </IconContainer> */}
    </HeaderWrapper>
  );
};

// MAIN TEXT

const Info = styled.div`
  align-self: flex-start;

  animation: appear 1s ease-in;
  animation-delay: 1s;
  animation-fill-mode: both;

  ${"" /* width: 90%; */}

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

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

  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;

const HeaderWrapper = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "ft1  ft2"
    "ft3  ft4";

  @media (min-width: 360px) {
    grid-gap: 24px;
    padding: 8px;
    padding-bottom: 42px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 640px) {
    grid-gap: 16px;
    padding: 16px;
    padding-bottom: 42px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "ft1 ft3 ."
      "ft2 ft4 .";
  }

  @media (min-width: 1024px) {
    grid-gap: 16px;
    padding: 16px;
    padding-bottom: 42px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: "ft1 ft2 ft3 ft4";
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: "ft1 ft2 ft3 ft4 .";
  }

  @media (min-width: 1920px) {
    grid-gap: 16px;
    padding: 16px;
    padding-bottom: 42px;
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas: "ft1 ft2 ft3 ft4 . .";
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

const Ft4 = styled(Info)`
  grid-area: ft4;
`;

