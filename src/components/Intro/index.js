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

export const Intro = () => {
  return (
    <IntroWrapper>
      <Logo fill={"#000"} width={"60%"} hoverfill={"#CCC"} />
    </IntroWrapper>
  );
};

const Content = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #000;
  a {
    color: #0029FF;
    text-decoration: none;
  }
  a:visited {
    color: #0029FF;
  }
  a:hover {
    text-decoration: underline;
  }
  width: 100%;
`;
