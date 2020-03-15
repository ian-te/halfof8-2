import React from "react"
import Image from "gatsby-image"

export const ContentImage = ({ item }) => {
  if (
    !item.indexBackgroundImage ||
    !item.indexBackgroundImage.localFile ||
    !item.indexBackgroundImage.localFile.childImageSharp
  ) {
    return null
  }
  const data = item.indexBackgroundImage.localFile
  console.log(data)
  const sources = [{ ...data.childImageSharp.fluid, sizes: "25vw" }]
  return <Image fluid={sources} />
}
