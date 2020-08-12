import React from "react";
import Logo from "../Logo";
import styled from "styled-components";
import { ContentWrapper } from "../Item";

export const IntroWrapper = ({ children }) => {
  return (
    <div className="sr-item load-hidden" style={{ visibility: "visible" }}>
      <ContentWrapper>
        <Content>{children}</Content>
      </ContentWrapper>
    </div>
  );
};

export const Intro = ({ color = "#000" }) => {
  return (
    <IntroWrapper>
      <Logo fill={color} width={"60%"} hoverfill={"#CCC"} />
    </IntroWrapper>
  );
};

const Content = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: grey;
  a {
    color: grey;
    text-decoration: none;
  }
  a:visited {
    color: grey;
  }
  a:hover {
    color: #0029ff;
    text-decoration: none;
  }
  width: 100%;
`;
