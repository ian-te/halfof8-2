import React from "react";
import styled from "styled-components";
import { MobileShow, MobileHide } from "../MobileHide";
import Link from "gatsby-link";

const Text = () => (
  <p>8の半 &copy; 2012 – {new Date().getFullYear()}, 👋  <br/>
    Car does not move till we are all buckled up, so keep in touch <br/>
    via <a href="mailto:info@halfof8.com">info@halfof8.com</a> <br/>
    Design by <a href="https://instagram.com/halfof8">Anton Sokolov</a> <br/>
    Development by <a href="https://github.com/yante" target="_blank">Yan Te</a><br/>
  </p>
);
const FooterBase = ({ className, children }) => (
  <div className={className}>{children || <Text/>}</div>
);

const FooterStyled = styled(FooterBase)`
  padding: ${props => props.padding || '20px 25px 10px'};
  text-align: left;
  a {text-decoration: none;}
  p {
    font-size: 10px;
    line-height: 1.5;
  }
  letter-spacing: left;
  text-align: ${props => props.align || 'center'};
  color: ${props => props.color || "#000000"};
`;

export default FooterStyled;
