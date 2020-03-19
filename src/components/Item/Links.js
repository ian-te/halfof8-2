import React, { useEffect } from "react"
import styled from "styled-components"

const LinkBase = ({ md, className }) => {
  const link = md
    .slice(1)
    .slice(0, -1)
    .split("](")
  return (
    <a
      href={link[1]}
      onClick={e => e.stopPropagation()}
      target="_blank"
      className={className}
    >
      {link[0]}
    </a>
  )
}

const Link = styled(LinkBase)`
  height: 34px;
  background: #ffffff;
  color: #0c0c0d;
  text-decoration: none;
  border-radius: 34px;
  margin-top: 14px;
  flex-shrink: 1;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
`

const LinksBase = ({ links, className }) => {
  if (!links) return null
  return (
    <div className={className}>
      {links.map(md => (
        <Link md={md}></Link>
      ))}
    </div>
  )
}

export const Links = styled(LinksBase)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  display: none;
`
