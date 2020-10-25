import { Link } from "gatsby";
import React, { useContext } from "react";
import { ReducerContext } from "../../reducers/root";

const LightBoxWrapper = ({ children, item }) => {
  const { dispatch } = useContext(ReducerContext);
  return (
    <div
      onClick={() =>
        dispatch({
          type: "OPEN_MODAL",
          data: {
            slide: item.currentSlide
          }
        })
      }
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  );
};

export const ContentAction = ({ item, children, ...props }) => {
  switch (true) {
    case !!item.lightbox:
      return (
        <div {...props}>
          <LightBoxWrapper item={item}>{children}</LightBoxWrapper>
        </div>
      );
    case !!item.externalUrl:
      return (
        <a href={`${item.externalUrl}`} target="_blank" {...props}>
          {children}
        </a>
      );
    case !!item.slug:
      return (
        <Link
          to={`${item.isRootPage ? "/" : "project/"}${item.slug}`}
          {...props}
        >
          {children}
        </Link>
      );
    default:
      return <div>{children}</div>;
  }
};
