import React from "react"
import { ContentImage } from "./Image"

export const Item = ({ name, slug, ...item }) => {
  return (
    <div>
      <ContentImage item={item} />
      {name}
    </div>
  )
}
