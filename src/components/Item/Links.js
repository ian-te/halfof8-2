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
      {/* <IconWrapper>
        <NewWindow width="10" />
      </IconWrapper> */}
      <span>{link[0]}</span>
    </a>
  );
};

const IconWrapper = styled.span`
  display: none;
  margin-right: 8px;

  @media (min-width: 640px) {
    display: block;
  }
`;

const Link = styled(LinkBase)`
  height: 24px;
  font-size: 12px;
  line-height: 12px;
  margin-top: 12px;
  padding: 0 10px;
  padding-bottom: 2px;

  background: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  text-decoration: none;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-items: center;
  transform: scale(1);

  @media (min-width: 1024px) {
    height: 32px;
    font-size: 14px;
    line-height: 12px;
    margin-top: 12px;
    padding: 0 10px;
    padding-bottom: 2px;
    box-shadow: 0px 1.24527px 2.46286px rgba(0, 0, 0, 0.0562291),
      0px 2.99255px 5.91859px rgba(0, 0, 0, 0.0807786),
      0px 5.6347px 11.1442px rgba(0, 0, 0, 0.1),
      0px 10.0513px 19.8793px rgba(0, 0, 0, 0.119221),
      0px 18.7999px 37.1821px rgba(0, 0, 0, 0.143771),
      0px 45px 89px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    color: ${props => props.theme.linkActiveColor} ;
    svg path {
      fill: ${props => props.theme.linkActiveColor}  !important;
    }
  }

  @keyframes FadeIn {
    0% {
      transform: scale(1);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  animation: FadeIn 0.2s linear;
  animation-fill-mode: both;
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

  @media (min-width: 640px) {
    top: 8px;
    left: 16px;
  }

  & a:nth-child(1) {
    animation-delay: 0.2s;
  }
  & a:nth-child(2) {
    animation-delay: 0.1s;
  }
  & a:nth-child(3) {
    animation-delay: 0s;
  }
`;
