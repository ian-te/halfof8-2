import React from "react";
import styled from "styled-components";
import { ContentAction } from "./ContentAction";
import { ContentRenderer } from "./ContentRenderer";
import { Icon } from "./Icon";
import { Links } from "./Links";

export const Item = ({ name, tag, ratio = "0.75", ...item }) => {
  return (
    <div className="sr-item load-hidden" style={{ visibility: "visible" }}>
      <ContentActionStyled item={item}>
        <ContentWrapper ratio={item.ratio}>
          <ContentInner>
            <ContentRenderer item={item} />
            <Links links={item.externalLinks} />
          </ContentInner>
        </ContentWrapper>
        <Text>
          <h4>
            {name} {tag}
          </h4>
        </Text>
      </ContentActionStyled>
    </div>
  );
};

const ContentInner = styled.div`
  overflow: hidden;
  border-radius: 4px;
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
    box-shadow: 0px 3.34838px 2.96096px rgba(0, 42, 125, 0.0759093),
      0px 8.04662px 7.11561px rgba(0, 42, 125, 0.109051),
      0px 15.1511px 13.3981px rgba(0, 42, 125, 0.135),
      0px 27.0269px 23.8999px rgba(0, 42, 125, 0.160949),
      0px 50.5509px 44.702px rgba(0, 42, 125, 0.194091),
      0px 121px 107px rgba(0, 42, 125, 0.27);
    -webkit-transform: scale(1.03);
    -ms-transform: scale(1.03);
    transform: scale(1.03);
    transition: all 0.5s ease;
    z-index: 999;
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
    padding-bottom: calc(100% / ${props => props.ratio || `(3 / 4)`});
  }
`;

const Text = styled.div`
  padding: 8px 2px;

  h4 {
    font-weight: normal;
    color: grey;
    font-size: 12px !important;
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 10px !important;
    padding: 0;
  }
`;
