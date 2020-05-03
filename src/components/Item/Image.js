import React from "react";
import Image from "gatsby-image";

export const ContentImage = ({ item }) => {
  if (!item.indexBackgroundImage || !item.indexBackgroundImage.localFile) {
    return null;
  } else if (item.indexBackgroundImage.localFile.childImageSharp) {
    const data = item.indexBackgroundImage.localFile;
    const aspectRatio = data.childImageSharp.fluid.aspectRatio;
    const width = ((100 / 4) * aspectRatio) / 0.75 - 2;
    const sources = [
      {
        ...data.childImageSharp.fluid,
        sizes: `${width}vw`,
        aspectRatio: 3 / 4,
        key: item.id
      },
      {
        ...data.childImageSharp.fluid,
        media: "(max-width: 480px)",
        key: `mobile${item.id}`,
        aspectRatio: 3 / 4,
        sizes: "50vw"
      }
    ];
    return <Image fluid={sources} />;
  }
  return (
    <img
      width="100%"
      style={{ display: "block" }}
      src={item.indexBackgroundImage.file.url}
    />
  );
};
