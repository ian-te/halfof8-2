import React from "react";
import Logo from "../Logo";
import styled from "styled-components";
import { ContentWrapper } from "../Item";

export const IntroWrapper = ({ children }) => {
  return (
    <div className="sr-item load-hidden">
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
  font-size: 14px;
  color: #000;
  a {
    color: #000;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  width: 100%;
`;
