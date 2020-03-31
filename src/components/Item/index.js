import React from "react";
import styled from "styled-components";
import { ContentAction } from "./ContentAction";
import { ContentRenderer } from "./ContentRenderer";
import { Icon } from "./Icon";
import { Links } from "./Links";

export const Item = ({ name, tag, ...item }) => {
  return (
    <div className="sr-item load-hidden" style={{ visibility: "hidden" }}>
      <ContentActionStyled item={item}>
        <ContentWrapper>
          <ContentInner>
            <ContentRenderer item={item} />
            <Links links={item.externalLinks} />
          </ContentInner>
        </ContentWrapper>
        <Text>
          <h4>{name}</h4>
          <p>{tag}</p>
        </Text>
      </ContentActionStyled>
    </div>
  );
};

const ContentInner = styled.div`
  overflow: hidden;
  border-radius: 3px;
  position: relative;
  background-color: black;
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
    background-color: rgba(12, 12, 13, 0.6);
  }
`;

const ContentActionStyled = styled(ContentAction)`
  color: #0c0c0d;
  text-decoration: none;
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
    padding-bottom: calc(100% / (3 / 4));
  }
`;

const Text = styled.div`
  padding: 12px 2px;
  h4 {
    font-weight: normal;
    margin: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;