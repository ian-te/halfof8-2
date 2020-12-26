import React from "react";
import Logo from "./logo";
import styled from "styled-components";
import Link from "gatsby-link";
import { MobileHide } from "../MobileHide";
import Footer from "../Footer";

const Sidebar = ({ className, color, bgColor }) => (
  <div className={className}>
    <LogoContainer>
      <Link to="/">
        <Logo fill={color || "#000"} hoverfill={color ? "#CCC" : "#0000FF"} />
      </Link>
    </LogoContainer>
    <div />
    <MobileHide>
      <Footer padding="36px 48px 48px" />
    </MobileHide>
  </div>
);

const LogoContainer = styled.div`
  @media (min-width: 560px) {
    text-align: center;
    position: fixed;
    width: 17%;
    min-width: 250px;
    max-width: 320px;
  }
`;

const SidebarStyled = styled(Sidebar)`
  min-width: 250px;
  height: 100%;
  padding-top: 26px;
  flex-shrink: 0;
  flex-grow: 0;
  text-align: center;
  font-size: 13px;
  background-color: ${props => (props.bgColor ? props.bgColor : "#fff")};
  line-height: 1.7;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    color: ${props => (props.color ? props.color : "#000000")};
  }
  ${props =>
    props.color
      ? `a{
    color ${props.color}
  }`
      : ""}
  @media(max-width: 560px) {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
`;

export default SidebarStyled;
