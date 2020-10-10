import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const LogoBase = ({ className, width = 150 }) => {
  const { textColor: fill } = useContext(ThemeContext);
  return (
    <svg className={className}  width="62" height="88" viewBox="0 0 62 88">
      <g>
        <path d="M37 0V13H49V25H37V38H62V0H37Z" fill={fill} />
        <path d="M25 38L25 25L13 25L13 13L25 13L25 0L3.32207e-06 -2.18557e-06L0 38L25 38Z" fill={fill} />
        <path d="M37 50V63H49V75H37V88H62V50H37Z" fill={fill} />
        <path d="M25 88L25 75L13 75L13 63L25 63L25 50L3.32207e-06 50L0 88L25 88Z" fill={fill} />
      </g>
    </svg>
  );
};

export const Logo = styled(LogoBase)`
  margin: 0 auto;

  ${'' /* &:hover {
    path[fill] {
      stroke: ${props => props.theme.textColor};
    }
  } */}

  &:hover {
    path[fill] {
      fill: #FFA800;
    }
  }

`;

export default Logo;
