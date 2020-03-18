import React from "react"
import Image from "gatsby-image"

export const ContentImage = ({ item }) => {
  if (!item.indexBackgroundImage || !item.indexBackgroundImage.localFile) {
    return null
  } else if (item.indexBackgroundImage.localFile.childImageSharp) {
    const data = item.indexBackgroundImage.localFile
    const sources = [{ ...data.childImageSharp.fluid, sizes: "25vw" }]
    return <Image fluid={sources} />
  }
  return <img width="100%" src={item.indexBackgroundImage.file.url} />
}
