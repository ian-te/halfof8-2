import React from "react"
import { ContentImage } from "./Image"
import styled from "styled-components"

const ContentRenderer = ({ item }) => {
  console.log(item)
  switch (true) {
    case typeof item.indexBackgroundImage !== "undefined":
      return <ContentImage item={item} />
    case typeof item.embedUrl !== "undefined":
      return <iframe src={item.embedUrl} width="100%" height="100%" />
    default:
      return <img width="100%" src="https://placehold.it/600x800" />
  }
}

export const Item = ({ name, slug, ...item }) => {
  return (
    <div>
      <ContentWrapper>
        <ContentRenderer item={item} />
      </ContentWrapper>
      <Text>{name}</Text>
    </div>
  )
}

const ContentWrapper = styled.div`
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  border-radius: 3px;
  height: calc((25vw - 16px) * 1.25 - 16px);
`

const Text = styled.div`
  padding: 12px 2px;
`
