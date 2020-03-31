import React, { useEffect, useState } from "react";
import { ContentImage } from "./Image";
import { Icon } from "./Icon";
import { ThreeRenderer } from "./ThreeRenderer";

const IframeAsync = ({ src, ...props }) => {
  const [deferredSrc, setSrc] = useState(null);
  useEffect(() => {
    setSrc(src);
  });
  return deferredSrc && <iframe frameborder="0" src={deferredSrc} {...props} />;
};

export const ContentRenderer = ({ item }) => {
  switch (true) {
    case !!item.fbxFile:
      return <ThreeRenderer model={item.fbxFile.file.url} />;
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
            style="display: block;"
          />
        </div>
      );
  }
};
