import React from "react";
import styled from "styled-components";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Tag } from "../Tag";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useLocale } from "../../providers/LocaleProvider";

const Item = ({ item }) => {
  switch (item.__typename) {
    case "ContentfulTextSnippet":
      return <span>{renderRichText(item.text)}</span>;
    default:
      return <Tag {...item} />;
  }
};

export const Header = ({ menu }) => {
  const locale = useLocale();

  return (
    <Wrapper>
      <ItemsContainerLeft>
        {menu.leftItems && menu.leftItems.map((item) => <Item item={item} />)}
      </ItemsContainerLeft>
      <ItemsContainerRight>
        <LanguageSwitcher locales={["en-US", "ja"]} activeLocale={locale} />
        {menu.rightItems && menu.rightItems.map((item) => <Item item={item} />)}
      </ItemsContainerRight>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  align-content: space-between;

  p {
    color: ${(props) => props.theme.headerTextHover};
    margin: 0;

    a {
      @media (min-width: 320px) {
        padding: 4px 16px;
        border-radius: 32px;
      }

      @media (min-width: 640px) {
        padding: 2px 8px;
        border-radius: 40px;
      }

      @media (min-width: 1024px) {
        padding: 4px 16px;
        border-radius: 40px;
      }
    }

    a:hover {
      background-color: ${(props) => props.theme.textColor};
      color: ${(props) => props.theme.bgColor}!important;
      transition: 0.5s ease;
    }
  }

  a {
    color: ${(props) => props.theme.textColor};
    text-decoration: none;
    background-color: ${(props) => props.theme.headerBgColor};
  }

  @media (min-width: 320px) {
    font-size: 6.5vw;
    line-height: 1;
    display: grid;
    grid-template-areas:
      "leftNav"
      "rightNav"
      "player";
    padding: 12px 12px;
    word-break: break-word;
  }

  @media (min-width: 640px) {
    top: 0;
    position: sticky;
    z-index: 10;
    display: grid;
    grid-template-areas:
      "leftNav rightNav"
      "player player";
    padding: 6px 12px;
    font-size: 2vw;
  }

  @media (min-width: 1024px) {
    position: sticky;
    z-index: 10;
    padding: 12px 12px;
    font-size: 2vw;
  }
`;

const ItemsContainerLeft = styled.nav`
  display: flex;
  grid-area: leftNav;

  & > * {
    margin-right: 8px;
  }

  & > * {
    animation: menuappearleft 0.5s ease-in;
    animation-fill-mode: both;
    animation-delay: 0.1s;
  }

  ${Array.from(Array(20).keys()).map(
    (key) => `& > :nth-child(${key}) {animation-delay: ${(key + 1) / 4}s;}`
  )}

  @keyframes menuappearleft {
    0% {
      transform: translateX(-10px);
      opacity: 0;
    }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  @media (min-width: 320px) {
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    & > * {
      margin-bottom: 12px;
      margin-right: 8px;
    }
  }

  justify-content: left;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    & > * {
      margin-bottom: 0px !important;
      margin-right: 6px;
    }
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    & > * {
      margin-bottom: 0px !important;
      margin-right: 8px;
    }
  }
`;

const ItemsContainerRight = styled.nav`
  display: flex;
  align-items: center;
  grid-area: rightNav;
  & > * {
    animation: menuappearright 0.5s ease-in;
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  @keyframes menuappearright {
    0% {
      transform: translateX(10px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (min-width: 320px) {
    flex-direction: row-reverse;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-bottom: 16px;

    & > :first-child {
      margin-bottom: 16px;
    }
  }

  @media (min-width: 640px) {
    flex-direction: row-reverse;
    justify-content: right;
    align-items: center;
    margin-bottom: 0px;

    & > :first-child {
      margin-bottom: 0px;
    }

    & > * {
      margin-left: 8px;
    }
  }
`;
