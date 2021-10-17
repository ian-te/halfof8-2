import React, { useState } from "react";
import { MARKS, INLINES } from "@contentful/rich-text-types";
import styled, { css } from "styled-components";

import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Tag } from "../Tag/index";

const Bold = ({ children }) => <span className="bold">{children}</span>;

const Header = styled.button`
  font-size: 110%;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: inherit;
  outline: none;
  width: 100%;
  min-height: 64px;
  padding: 8px;

  font-family: neue-haas-grotesk-text, "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-size: 7vw;

  & > :first-child {
    margin-right: 14px;
  }
  @media (min-width: 480px) {
    display: none;
  }
  ${"" /* margin-bottom: -1px; */}
  margin-top: 0px !important;

  svg {
    transition: transform 0.2s;
    ${({ isOpen }) =>
      isOpen &&
      css`
        transform: rotate(45deg);
      `}
  }
`;

const Text = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};

  padding: 8px;
  @media (min-width: 360px) {
    padding: 8px;
  }

  @media (min-width: 640px) {
    padding: 12px;
    padding-right: 24px;
  }

  @media (min-width: 480px) {
    display: block;
  }
`;

export const RichText = ({ item }) => {
  const { text, name, textColor, expandable, backgroundColor, externalUrl } =
    item;
  const [isOpen, setOpen] = useState(false);

  return (
    <RichTextWrapper
      textColor={textColor}
      backgroundColor={backgroundColor}
      style={{ zIndex: 1, position: "relative" }}
    >
      {expandable && (
        <Header onClick={() => setOpen(!isOpen)} isOpen={isOpen}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM19 19H8.57178V21H19V31.4281H21V21H31.4289V19H21V8.57096H19V19Z"
              fill={textColor}
            />
          </svg>
          {name}
        </Header>
      )}
      <Text isOpen={isOpen || !expandable}>
        {externalUrl ? (
          renderRichText(text, options)
        ) : (
          <a target="_blank" href={externalUrl}>
            {renderRichText(text, options)}
          </a>
        )}
      </Text>
    </RichTextWrapper>
  );
};

const RichTextWrapper = styled.div`
  z-index: 1000;
  position: relative;
  font-size: 20px;
  height: 100%;
  line-height: 1.35;

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor || props.theme.textColor};

  a {
    color: ${(props) => props.textColor || props.theme.textColor};
    border-bottom: 1px solid
      ${(props) => props.textColor || props.theme.textColor};
    text-decoration: none;
  }

  a:hover {
    color: ${(props) => props.textColor || props.theme.textColor};
    border-bottom: 0px solid
      ${(props) => props.textColor || props.theme.textColor};
    text-decoration: none;
  }

  h3 {
    font-family: neue-haas-grotesk-display, sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 10;
  }

  @media (min-width: 360px) {
    font-size: 20px;
    line-height: 1.3;

    h3 {
      font-size: 40px;
    }
  }

  @media (min-width: 640px) {
    font-size: 1.7vw;
    line-height: 1.35;
    h3 {
      font-size: 3vw;
    }
  }

  @media (min-width: 1024px) {
    font-size: 1.3vw;
    h3 {
      font-size: 2.7vw;
    }
  }
  @media (min-width: 1440px) {
    font-size: 1vw;
    h3 {
      font-size: 2.2vw;
    }
  }
  @media (min-width: 1920px) {
    font-size: 0.85vw;
    h3 {
      font-size: 1.8vw;
    }
  }
`;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderNode: {
    // [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    // [BLOCKS.EMBEDDED_ASSET]: (node) => {
    //   return (
    //     <>
    //       <h2>Embedded Asset</h2>
    //       <pre>
    //         <code>{JSON.stringify(node, null, 2)}</code>
    //       </pre>
    //     </>
    //   );
    // },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      const { name, identifier } = node.data.target;
      return <Tag name={name} identifier={identifier} />;
    },
  },
};
