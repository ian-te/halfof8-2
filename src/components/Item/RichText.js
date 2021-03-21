import React, { useState } from "react";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import styled from "styled-components";

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
  min-height: 40px;
  padding: 8px;
  & > :first-child {
    margin-right: 14px;
  }
  @media (min-width: 480px) {
    display: none;
  }
`;

const Text = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding: 7px;
  padding-right: 24px;

  @media (min-width: 480px) {
    display: block;
  }
  
`;

export const RichText = ({ item }) => {
  console.log(">>> Rich Text props", item);
  const { text, name, textColor, expandable, backgroundColor } = item;
  const [isOpen, setOpen] = useState(false);

  return (
    <RichTextWrapper
      textColor={textColor}
      backgroundColor={backgroundColor}
      style={{ zIndex: 1000, position: "relative" }}
    >
      {expandable && (
        <Header onClick={() => setOpen(!isOpen)}>
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M30.5 16.8027C30.5 24.5347 24.232 30.8027 16.5 30.8027C8.76801 30.8027 2.5 24.5347 2.5 16.8027C2.5 9.07075 8.76801 2.80273 16.5 2.80273C24.232 2.80273 30.5 9.07075 30.5 16.8027ZM16 16.3027V8.80273H17V16.3027H24.5V17.3027H17V24.8027H16V17.3027H8.5V16.3027H16Z"
              fill={textColor}
            />
          </svg>
          {name}
        </Header>
      )}
      <Text isOpen={isOpen || !expandable}>
        {renderRichText(text, options)}
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
  color: ${(props) => props.textColor};

  a {
    color: ${(props) => props.textColor};
    border-bottom: 1px solid ${(props) => props.textColor};
    text-decoration: none;
  }
  
  p {  
    margin-block-start: 0;
    margin-block-end: 10; 
  }
  @media (min-width: 360px) {
    font-size: 28px;
    line-height: 1.2;
  }
  @media (min-width: 640px) {
    font-size: 20px;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
  }
  @media (min-width: 1440px) {
    font-size: 20px;
    line-height: 1.3;
  }
  @media (min-width: 1920px) {
    font-size: 20px;
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
      console.log(">>>", node);
      return <Tag name={name} identifier={identifier} />;
    },
  },
};
