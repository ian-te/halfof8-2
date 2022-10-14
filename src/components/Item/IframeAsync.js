import React, { useEffect, useState } from "react";

export const IframeAsync = ({ src, ...props }) => {
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
