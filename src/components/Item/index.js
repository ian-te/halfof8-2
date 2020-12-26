import React from "react";
import styled from "styled-components";
import { ContentAction } from "./ContentAction";
import { ContentRenderer } from "./ContentRenderer";
import { Icon } from "./Icon";
import { Links } from "./Links";

export const Item = ({ visible, name, tag, ratio = "0.75", ...item }) => {
  if (!!item.embedUrl) ratio = 6 / 4;
  return (
    <ContentActionStyled
      isDouble={!!item.embedUrl}
      visible={visible}
      item={item}
    >
      <ContentWrapper ratio={ratio}>
        <ContentInner>
          <ContentRenderer item={item} />
          <Links links={item.externalLinks} />
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
  &:hover {
    opacity: 85%;
    transition: 1s ease;
    ${"" /* z-index: 999; */}
  }
`;

const ContentActionStyled = styled(ContentAction)`
  text-decoration: none;
  @media (min-width: 360px) {
    ${props => props.isDouble && `grid-column: span 2;`}
  }
  ${props =>
    !props.visible && `visibility: hidden; position: absolute; z-index: -10;`}
  &:hover {
    ${Links}, ${Icon}, ${ContentInner}:before {
      display: flex;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  &:after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    padding-bottom: calc(100% / ${props => props.ratio || `(3 / 4)`});
  }
`;
