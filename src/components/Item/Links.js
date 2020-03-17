import React from "react"
import styled from "styled-components"

const Link = styled.a`
  height: 34px;
  background: #ffffff;
  border-radius: 34px;
  margin-top: 14px;
  flex-shrink: 1;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
`

const LinksBase = ({ item, className }) => {
  return (
    <div className={className}>
      <Link>Spotify</Link>
      <Link>Apple Music</Link>
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
`
