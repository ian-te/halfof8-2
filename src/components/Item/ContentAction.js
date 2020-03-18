import { Link } from "gatsby"
import React from "react"

export const ContentAction = ({ item, children, ...props }) => {
  switch (true) {
    case !!item.externalUrl:
      return (
        <a href={`${item.externalUrl}`} target="_blank" {...props}>
          {children}
        </a>
      )
    case !!item.slug:
      return (
        <Link
          to={`${item.isRootPage ? "" : "project/"}${item.slug}`}
          {...props}
        >
          {children}
        </Link>
      )
    default:
      return <div>{children}</div>
  }
}
