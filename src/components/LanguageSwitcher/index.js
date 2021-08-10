import React from "react";
import styled, { css } from "styled-components";
import { invert } from "polished";
import { Link, useI18next } from "gatsby-plugin-react-i18next";

const getLocaleName = (lng) => {
  const languageMap = {
    "en-US": "ENG",
    ja: "日本語",
  };
  return languageMap[lng] || "lng";
};

export const LanguageSwitcher = ({ locales = [], activeLocale = "en-US" }) => {
  const { languages, language, originalPath } = useI18next();
  console.log(">>>", languages, language, originalPath);
  return (
    <Wrapper>
      {languages.map((lng) => (
        <Locale
          to={originalPath}
          language={lng}
          key={lng}
          active={language === lng}
        >
          {getLocaleName(lng)}
        </Locale>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 0.2em solid ${(props) => props.theme.textColor}; */
  display: flex;
  background-color: ${(props) => invert(props.theme.textColor)};
  color: ${(props) => props.theme.textColor};
  border-radius: 1000px;
  position: relative;
`;

const Locale = styled(Link)`
  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => props.theme.bodyColor};
      border-radius: 1000px;
      color: ${(props) => props.theme.textColor};
    `}
  padding: 0.3em;
  text-decoration: none;
  margin: 5px;
  line-height: 1em;
  min-width: 1em;
  color: ${(props) => props.theme.textColor};
`;
