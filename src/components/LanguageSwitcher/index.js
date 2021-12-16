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
  background-color: ${(props) => props.theme.headerBgColor};
  color: ${(props) => props.theme.headerTextColor};
${'' /* 
  border: 1px solid ${(props) => props.theme.headerTextColor}; */}

  border-radius: 1000px;
  position: relative;

  a:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor}!important;
    border-radius: 1000px;
    transition: 0.5s ease;
  }
`;

const Locale = styled(Link)`

  ${(props) =>
    props.active &&
    css`
      background-color: none;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      border: 1px solid #000000;
      border-radius: 1000px;
    `}


  text-decoration: none;

  color: ${(props) => props.theme.headerTextColor};

  line-height: 1;
  border-radius: 40px;

  @media (min-width: 320px) {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 12px;
    margin: 4px;
  }

  @media (min-width: 640px) {
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 6px;
    padding-right: 6px;
    margin: 2px;

  }

  @media (min-width: 1024px) {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 12px;
    margin: 4px;
  }

`;
