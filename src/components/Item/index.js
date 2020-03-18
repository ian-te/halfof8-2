import React from "react"
import { ContentRenderer } from "./ContentRenderer"
import styled from "styled-components"
import { Links } from "./Links"
import { ContentAction } from "./ContentAction"

export const Item = ({ name, tag, ...item }) => {
  return (
    <ContentActionStyled item={item}>
      <ContentWrapper>
        <ContentRenderer item={item} />
        <Links links={item.externalLinks} />
      </ContentWrapper>
      <Text>
        <h4>{name}</h4>
        <p>{tag}</p>
      </Text>
    </ContentActionStyled>
  )
}

const ContentActionStyled = styled(ContentAction)`
  color: #0c0c0d;
  text-decoration: none;
  &:hover {
    ${ContentWrapper} {
    }
    ${Links} {
      display: flex;
    }
  }
`

const ContentWrapper = styled.div`
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  border-radius: 3px;
  height: calc((25vw - 16px) * 1.25 - 16px);
  position: relative;
  background-color: black;
`

const Text = styled.div`
  padding: 12px 2px;
  h4 {
    font-weight: normal;
    margin: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
`
