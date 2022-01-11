import { Link, useI18next } from "gatsby-plugin-react-i18next";
import React from "react";
import styled, { css } from "styled-components";
import { Match } from "@reach/router";
import { getPath } from "../../helpers/locale";

export const Tag = ({ name, identifier }) => {
  const language = useI18next().language;
  return (
    <Match path={getPath(`/tag/${identifier}`, language)}>
      {(props) =>
        props.match ? (
          <Wrapper to={`/`} isActive={true}>
            {name}
          </Wrapper>
        ) : (
          <Wrapper to={`/tag/${identifier}`} activeClassName="active">
            {name}
          </Wrapper>
        )
      }
    </Match>
  );
};

const Wrapper = styled(Link)`
  text-decoration: none !important;

  line-height: 1;

  ${(props) =>
    props.isActive
      ? css`
          background-color: ${(props) => props.theme.textColor}!important;
          color: ${(props) => props.theme.bgColor}!important;
        `
      : css`
          background-color: ${(props) => props.theme.headerBgColor};
          color: ${(props) => props.theme.headerTextColor};
        `}

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
