import React from "react";
import styled, { css } from "styled-components";
import { invert } from "polished";
import { Link } from "gatsby";

export const LanguageSwitcher = ({ locales = [], activeLocale = "en-US" }) => {
  return (
    <Wrapper to={locales.filter((l) => l !== activeLocale)[0]}>
      {locales.map((locale) => (
        <Locale active={activeLocale === locale}>{locale}</Locale>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  /* border: 0.2em solid ${(props) => props.theme.textColor}; */
  display: flex;
  background-color: ${(props) => invert(props.theme.textColor)};
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  border-radius: 1000px;
  position: relative;
`;

const Locale = styled.div`
  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => props.theme.bodyColor};
      border-radius: 1000px;
      color: ${(props) => props.theme.textColor};
    `}
  padding: 0.3em;
  margin: 5px;
  line-height: 1em;
  color: ${(props) => props.theme.textColor};
`;
