import React from "react";
import styled from "styled-components";
import { ContentWrapper } from "../Item";
import { useReducerContext } from "../../reducers/root";
import { Link } from "gatsby";

export const IntroWrapper = ({ children }) => {
  return (
    <ContentWrapper>
      <Content>{children}</Content>
    </ContentWrapper>
  );
};

export const Filter = ({ color = "#000" }) => {
  const {
    state: {
      filter: { tag }
    },
    dispatch
  } = useReducerContext();
  return (
    <IntroWrapper>
      {!!tag && (
        <div>
          You viewed all the {tag}.{" "}
          <a
            onClick={() => {
              dispatch({ type: "RESET_FILTER" });
            }}
          >
            Reset filters
          </a>{" "}
          to see all types of work or explore{" "}
          <Link to={"/wip"}>Work in Progress&nbsp;&rarr;</Link>
        </div>
      )}
      {!tag && (
        <div>
          You viewed all the work, thanks! Also, don't forget to fasten your
          seat-belt while driving. Safety, dah.
        </div>
      )}
    </IntroWrapper>
  );
};

const Content = styled.div`
  display: flex;
  text-align: left;
  align-items: top;
  justify-content: center;
  font-size: 1vw;
  line-height: 1.2;
  padding: 1.5vw;
  top: 10px;

  color: ${props => props.theme.textColor};

  a {
    color: ${props => props.theme.textColor};
    border-bottom: 0.1em solid ${props => props.theme.borderColor};
    text-decoration: none;
  }
  a:visited {
    color: ${props => props.theme.textColor};
  }
  a:hover {
    border-bottom: none;
  }
  width: 100%;

  @media (min-width: 360px) {
    font-size: 6vw;
  }
  @media (min-width: 640px) {
    font-size: 4vw;
  }
  @media (min-width: 1024px) {
    font-size: 1vw;
  }
  @media (min-width: 1440px) {
    font-size: 1vw;
  }
  @media (min-width: 1920px) {
    font-size: 1vw;
  }
`;
