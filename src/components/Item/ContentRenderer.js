import React, { useEffect, useState } from "react";
import { ContentImage } from "./Image";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { Audio } from "./Audio";
import { RichText } from "./RichText";

const IframeAsync = ({ src, ...props }) => {
  const [deferredSrc, setSrc] = useState(null);
  useEffect(() => {
    setSrc(src);
  }, [src]);
  return (
    deferredSrc && (
      <iframe
        frameborder="0"
        src={deferredSrc}
        title={props.title}
        {...props}
      />
    )
  );
};

export const ContentRenderer = ({ item }) => {
  switch (true) {
    case item.__typename === "ContentfulTextSnippet":
      return <RichText item={item} />;
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
      return (
        <IframeAsync
          title={`Youtube Embed – ${item.name}`}
          src={`${item.embedUrl}`}
          width="100%"
          height="100%"
        />
      );
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
