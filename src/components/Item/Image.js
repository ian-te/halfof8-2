import React from "react";
import Image from "gatsby-image";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const ContentImage = ({ item }) => {
  if (!item.indexBackgroundImage) {
    return null;
  } else if (item.indexBackgroundImage.thumbImage) {
    const image = getImage(item.indexBackgroundImage.thumbImage);
    return (
      <GatsbyImage
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        image={image}
        objectFit="contain"
        objectPosition="50% 50%"
        placeholder="none"
      />
    );
  }
  return (
    <img
      width="100%"
      alt={item.indexBackgroundImage.file.description}
      style={{ display: "block" }}
      src={item.indexBackgroundImage.file.url}
    />
  );
};
