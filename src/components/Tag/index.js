import { Link } from "gatsby-plugin-react-i18next";
import React from "react";
import styled from "styled-components";

export const Tag = ({ name, identifier }) => {
  return (
    <Wrapper to={`/tag/${identifier}`} activeClassName="active">
      {name}
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  text-decoration: none !important;

  background-color: ${(props) => props.theme.headerBgColor};

  line-height: 1;

  color: ${(props) => props.theme.headerTextColor};

  &.active {
    background-color: ${(props) => props.theme.textColor}!important;
    color: ${(props) => props.theme.bgColor};
  }

  cursor: pointer;

  @media (min-width: 320px) {
    padding: 8px 16px;
    border-radius: 32px;
  }

  @media (min-width: 640px) {
    padding: 4px 8px;
    border-radius: 40px;
  }

  @media (min-width: 1024px) {
    padding: 8px 16px;
    border-radius: 40px;
  }

  &:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor}!important;

    transition: 0.5s ease;
  }
`;
