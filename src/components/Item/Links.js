import React, { useEffect } from "react";
import styled from "styled-components";
import { NewWindow } from "../Icons/NewWindow";

const LinkBase = ({ md, className }) => {
  const link = md
    .slice(1)
    .slice(0, -1)
    .split("](");
  return (
    <a
      href={link[1]}
      onClick={e => e.stopPropagation()}
      target="_blank"
      className={className}
    >
      <IconWrapper>
        <NewWindow width="16" />
      </IconWrapper>
      <span>{link[0]}</span>
    </a>
  );
};

const IconWrapper = styled.span`
  display: none;
  margin-right: 16px;
  @media (min-width: 640px) {
    display: block;
  }
`;

const Link = styled(LinkBase)`
  height: 34px;
  background: #ffffff;
  color: #0c0c0d;
  text-decoration: none;
  border-radius: 34px;
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 0 14px;
  &:hover {
    color: #167dff;
    svg path {
      fill: #167dff !important;
    }
  }
`;

const LinksBase = ({ links, className }) => {
  if (!links) return null;
  return (
    <div className={className}>
      {links.map(md => (
        <Link md={md}></Link>
      ))}
    </div>
  );
};

export const Links = styled(LinksBase)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  display: none;
`;
