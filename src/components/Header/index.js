import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Tag } from "../Tag";

const Item = ({ item }) => {
  switch (item.__typename) {
    case "ContentfulTextSnippet":
      return <span>{renderRichText(item.text)}</span>;
    default:
      return <Tag {...item} />;
  }
};

export const Header = ({ menu }) => {
  console.log(">>>", menu);
  return (
    <Wrapper>
      <ItemsContainer>
        {menu.leftItems.map((item) => (
          <Item item={item} />
        ))}
      </ItemsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: ${(props) => props.theme.headerBgColor};
  padding: 4px 10px;
  p {
    margin: 0;
  }
  @media (min-width: 640px) {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
`;

const ItemsContainer = styled.nav`
  display: flex;
  & > * {
    margin-right: 10px;
  }
`;
