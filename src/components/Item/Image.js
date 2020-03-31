import React from "react";
import Image from "gatsby-image";

export const ContentImage = ({ item }) => {
  if (!item.indexBackgroundImage || !item.indexBackgroundImage.localFile) {
    return null;
  } else if (item.indexBackgroundImage.localFile.childImageSharp) {
    const data = item.indexBackgroundImage.localFile;
    const sources = [
      { ...data.childImageSharp.fluid, sizes: "23vw" },
      {
        ...data.childImageSharp.fluid,
        media: "(max-width: 480px)",
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
