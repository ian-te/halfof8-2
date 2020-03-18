import React from "react"
import { ContentImage } from "./Image"
import { Link } from "gatsby"

export const ContentRenderer = ({ item }) => {
  switch (true) {
    case typeof item.indexBackgroundImage !== "undefined":
      return <ContentImage item={item} />
    case typeof item.embedUrl !== "undefined":
      return <iframe src={item.embedUrl} width="100%" height="100%" />
    default:
      return <img width="100%" src="https://placehold.it/600x800" />
  }
}
