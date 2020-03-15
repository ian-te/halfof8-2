import React from "react"
import { ContentImage } from "./Image"
import styled from "styled-components"

export const Item = ({ name, slug, ...item }) => {
  return (
    <div>
      <ImageWrapper>
        <ContentImage item={item} />
      </ImageWrapper>
      <Text>{name}</Text>
    </div>
  )
}

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 3px;
`

const Text = styled.div`
  padding: 12px 2px;
`
