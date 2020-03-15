import React from "react"
import Image from "gatsby-image"

export const ContentImage = ({ item }) => {
  console.log(item)
  if (
    !item.indexBackgroundImage ||
    !item.indexBackgroundImage.localFile ||
    !item.indexBackgroundImage.localFile.childImageSharp
  ) {
    return null
  }
  const data = item.indexBackgroundImage.localFile
  const sources = [
    data.childImageSharp.s,
    {
      ...data.childImageSharp.l,
      media: `(min-width: 1024px)`,
    },
    {
      ...data.childImageSharp.xl,
      media: `(min-width: 1920px)`,
    },
  ]
  return (
    <Image width="100px" style={{ backgroundColor: "#EEE" }} fluid={sources} />
  )
}
