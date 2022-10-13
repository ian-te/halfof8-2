import React from "react";
import styled, { css } from "styled-components";
import { ContentAction } from "./ContentAction";
import { ContentRenderer } from "./ContentRenderer";
import { Icon } from "./Icon";
import { Links } from "./Links";

const getGridColumns = (item) => {
  switch (true) {
    case !!item.gridColumns:
      return item.gridColumns;
    case !!item.embedUrl && item.embedUrl.includes("youtu"):
      return 2;
    default:
      return 1;
  }
};

export const Item = ({ visible, tag, ratio = "0.75", ...item }) => {
  if (!visible) return null;
  const isTextSnippet = item.__typename === "ContentfulTextSnippet";

  if (!!item.embedUrl && item.embedUrl.includes("youtu")) {
    ratio = 6 / 4;
  }
  if (isTextSnippet) {
    ratio = 3 / 4;
  }
  console.log(">>> item", item.lightboxText);
  return (
    <ContentActionStyled
      isDouble={!!item.embedUrl}
      isDoubleSm={isTextSnippet}
      gridColumns={getGridColumns(item)}
      gridRows={item.gridRows}
      noHover={!!item.embedUrl}
      visible={visible}
      item={item}
    >
      <ContentWrapper ratio={ratio} isCollapsible={isTextSnippet}>
        <ContentInner hasHover={!isTextSnippet}>
          <ContentRenderer item={item} />
          {/* <Links links={item.externalLinks} /> */}
        </ContentInner>
      </ContentWrapper>
    </ContentActionStyled>
  );
};

const ContentInner = styled.div`
  overflow: hidden;
  border-radius: 0px;
  position: relative;

  width: 100%;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    display: none;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  ${(props) =>
    props.hasHover &&
    css`
      &:hover {
        ${"" /* opacity: 85%; */}
        filter: saturate(2);
        transition: 1s ease;
        ${"" /* z-index: 999; */}
      }
    `}
`;

const ContentActionStyled = styled(ContentAction)`
  text-decoration: none;
  @media (min-width: 360px) {
    ${(props) => props.gridColumns && `grid-column: span ${props.gridColumns};`}
    ${(props) => props.gridRows && `grid-row: span ${props.gridRows};`}
    ${(props) => props.isDoubleSm && `grid-column: span 2;`}
  }
  @media (min-width: 640px) {
    ${(props) => props.isDoubleSm && `grid-column: span 1;`}
  }
  ${(props) =>
    !props.visible && `display: none;position: absolute; z-index: -10;`}
  ${(props) =>
    !props.noHover &&
    `
  &:hover {
    ${Links}, ${Icon}, ${ContentInner}:before {
      display: flex;
    }
  }
  `}
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  ${(props) =>
    props.ratio &&
    css`
      &:after {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        padding-bottom: calc(100% / ${(props) => props.ratio || `(3 / 4)`});
      }
    `}
  @media(max-width:640px) {
    ${(props) =>
      props.isCollapsible &&
      css`
        &:after {
          padding-bottom: 0;
        }
      `}
  }
`;
