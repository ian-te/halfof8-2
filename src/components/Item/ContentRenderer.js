import React from "react";
import { ContentImage } from "./Image";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { Audio } from "./Audio";
import { RichText } from "./RichText";
import { IframeAsync } from "./IframeAsync";

export const ContentRenderer = ({ item }) => {
  switch (true) {
    case item.__typename === "ContentfulTextSnippet":
      return (
        <>
          <Icon item={item} />
          <RichText item={item} />
        </>
      );
    // case item.__typename === "ContentfulWip":

    case !!item.displayShortText:
      return (
        <div>
          <Text html={item.shortText.childMarkdownRemark.html} />
          <Icon item={item} />
          <ContentImage item={item} />
        </div>
      );
    case !!item.fbxFile:
      return null;
    case !!item.mp3:
      return <Audio {...item} />;
    case !!item.indexBackgroundImage:
      return (
        <div>
          <Icon item={item} />
          <ContentImage item={item} />
        </div>
      );
    case !!item.embedUrl:
      switch (true) {
        case item.embedUrl.includes("sketchfab.com"):
          return (
            <IframeAsync
              title={`Sketchfab – ${item.name}`}
              src={`${item.embedUrl}`}
              width="100%"
              height="100%"
              allowfullscreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
            />
          );
        case item.embedUrl.includes("youtube"):
        default:
          return (
            <IframeAsync
              title={`Youtube Embed – ${item.name}`}
              src={`${item.embedUrl}`}
              width="100%"
              height="100%"
            />
          );
      }

    default:
      return (
        <div>
          <Icon item={item} />
          <img
            width="100%"
            alt={item.name}
            src={`https://via.placeholder.com/600x800?text=${item.__typename}`}
            style={{ display: "block" }}
          />
        </div>
      );
  }
};
