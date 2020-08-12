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
          <h4> {name} {tag} </h4> 
        </Text>
      </ContentActionStyled>
    </div>
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
    -webkit-transform: scale(0.97);
    -ms-transform: scale(0.97);
    transform: scale(0.97);
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
  width: 80%;

  h4 {
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    margin: 0;

    @media (max-width: 375px) {
    font-size: 14px;
    letter-spacing: 0em;
    line-height: 18px;
  }

  }


  p {
    margin: 0;
    font-size: 10px !important;
    padding: 0;
  }
  
  .tag {
    font-size:2rem;
  padding: 1em 2em;
  margin: 1em;
  display: inline-block;
  border-radius: 4em;
  border:  solid transparent;
  background: linear-gradient(0deg,#ff6064, #ff9867), linear-gradient(0deg,#ff6064, #ff9867);
  color: #ff6064;
  }
`;
