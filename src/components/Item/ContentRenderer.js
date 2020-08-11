import React, { useEffect, useState, Fragment } from "react";
import { ContentImage } from "./Image";
import { Icon } from "./Icon";
import { ThreeRenderer } from "./ThreeRenderer";
import { Audio } from "./Audio";

const IframeAsync = ({ src, ...props }) => {
  const [deferredSrc, setSrc] = useState(null);
  useEffect(() => {
    setSrc(src);
  });
  return deferredSrc && <iframe frameborder="0" src={deferredSrc} {...props} />;
};

export const ContentRenderer = ({ item }) => {
  console.log(">>>", item.indexBackgroundImage);
  switch (true) {
    case !!item.fbxFile:
      return (
        <Fragment>
          <Icon item={item} />
          <ThreeRenderer
            model={item.fbxFile.file.url}
            lights={item.lights}
            color={item.fbxColor}
          />
        </Fragment>
      );
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
      return <IframeAsync src={item.embedUrl} width="100%" height="100%" />;
    default:
      return (
        <div>
          <Icon item={item} />
          <img
            width="100%"
            src="https://placehold.it/600x800"
            style={{ display: "block" }}
          />
        </div>
      );
  }
};
