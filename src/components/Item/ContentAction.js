import { Link } from "gatsby"
import React from "react"
import { Lightbox } from "react-modal-image"

const LightBoxWrapper = ({ item, children }) => {
  return (
    <div>
      <Lightbox large={item.indexBackgroundImage.localFile} />
      {children}
    </div>
  )
}

export const ContentAction = ({ item, children, ...props }) => {
  switch (true) {
    case !!item.lightbox:
      return (
        <div>
          <LightBoxWrapper item={item}>{children}</LightBoxWrapper>
        </div>
      )
    case !!item.externalUrl:
      return (
        <a href={`${item.externalUrl}`} target="_blank" {...props}>
          {children}
        </a>
      )
    case !!item.slug:
      return (
        <Link
          to={`${item.isRootPage ? "/" : "project/"}${item.slug}`}
          {...props}
        >
          {children}
        </Link>
      )
    default:
      return <div {...props}>{children}</div>
  }
}
