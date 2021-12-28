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
  ${"" /* background-color: ${(props) => props.theme.headerBgColor}; */}
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(30px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  p {
    color: rgba(0, 0, 0, 0.5);
    margin: 0;

    a {
      color: ${(props) => props.theme.textColor};
      text-decoration: none;
    }

    a:hover {
      color: rgba(0, 0, 0, 0.5);
    }
  }

  @media (min-width: 320px) {
    font-size: 7.5vw;
    line-height: 1.3;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 12px 12px;
    word-break: break-word;
  }

  @media (min-width: 640px) {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    font-size: 1.95vw;
  }

  @media (min-width: 1024px) {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 12px;
    font-size: 1.95vw;
  }
`;

const ItemsContainerLeft = styled.nav`
  display: flex;

  & > * {
    margin-right: 10px;
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
      margin-right: 10px;
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
      margin-right: 10px;
    }
  }
`;

const ItemsContainerRight = styled.nav`
  display: flex;
  align-items: center;

  & > * {
    animation: menuappearright 0.5s ease-in;
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  ${
    "" /* ${Array.from(Array(20).keys()).map(
    (key) => `& > :nth-child(${key}) {animation-delay: ${(key + 1) / 4}s;}`
  )} */
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

    & > :first-child {
      margin-bottom: 10px;
    }
  }

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & > :first-child {
      margin-bottom: 0px;
    }

    & > * {
      margin-left: 10px;
    }
  }

  
`;
