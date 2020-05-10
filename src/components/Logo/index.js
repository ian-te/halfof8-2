import React from "react";
import styled from "styled-components";

const Logo = ({ className, fill = "#000", width = 150 }) => (
  <svg
    className={className}
    viewBox="0 0 150 150"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
  >
 <path stroke={fill} fill="none" stroke-width=".5" d="M75.1 128.1c29.271 0 53-23.729 53-53s-23.729-53-53-53-53 23.729-53 53 23.728 53 53 53z"/>
  <path stroke={fill} fill="none" stroke-linecap="round" stroke-width=".5" d="M143.2 143.2L7 7M7 143.2L143.2 7"/>
  <path stroke={fill} fill="none" stroke-linecap="round" stroke-width=".5" d="M58.1 116.3l17-3.7M58.1 116.3l17-78.6"/>
  <path stroke={fill} fill="none" stroke-width=".5" d="M61.5 112.9c.6.6 1.1 1.5 1.3 2.4M60.7 113.7c.5.5.8 1.1 1 1.8M59.2 111.3c1 .2 1.8.7 2.5 1.4M59.4 110.2c1.2.3 2.2.8 3.1 1.7"/>
  <path stroke={fill} fill="none" stroke-linecap="round" stroke-width=".5" d="M58.1 116.3l28.4-28.5M66.1 106.6l1.6 1.6M67.1 108.9l-1.6-1.6M68.3 17.2L51.1 44.5M81.9 133l17.2-27.2M59.7 30.9l30.9 88.5"/>
  <path stroke={fill} fill="none" stroke-width=".5" d="M61.5 28c1.6 1 2.1 3.1 1.1 4.7-.4.6-1 1.1-1.8 1.4M88.7 122.2c-1.6-1-2.1-3.1-1.1-4.7.4-.6 1-1.1 1.8-1.4M11.5 75.1h124M11.5 72.9l-4.4 2.2 4.4 2.2M75 11.5V138M76.7 11.5L75 7.1l-1.7 4.4"/>
  <path fill="#000" stroke-width="0" d="M75.1 113.7a1.1 1.1 0 100-2.2 1.1 1.1 0 000 2.2zM75.1 38.8a1.1 1.1 0 100-2.2 1.1 1.1 0 000 2.2z"/>
  <path stroke={fill} fill="none" stroke-width="3" d="M75.1 22.2h-1.4l-.4.1h-.5l-.5.1-.4.1h-.5l-.4.1-.5.2-.4.1-.5.1-.4.2-.4.1-.5.2-.4.2-.4.2-.5.2-.4.2-.4.3-.4.2-.4.3-.4.2-.4.3-.4.3-.4.3-.4.3-.3.3-.4.4-.3.3-.4.4-.3.3-.4.4-.3.4-.3.4-.3.4-.3.4-.3.5-.3.4-.2.5-.3.4-.2.5-.3.5-.2.5-.2.5-.2.5-.2.5-.2.5-.2.6-.1.5-.2.6-.1.6-.1.6-.1.5-.1.6-.1.7v.6l-.1.6V44l.1.7v.7l.1.7.1.7.1.7.2.7.2.8.1.7.3.8.2.8.3.8.3.8.3.8.4.9.4.9.4.8.5 1 .5.9.6 1 .6 1 .8 1.1.8 1.1.8 1.2 1.1 1.3 1.2 1.4 1.4 1.7 2 2.1 4.9 5-4.9 5-2 2.1-1.4 1.7-1.2 1.4-1.1 1.3-.8 1.2-.8 1.2-.8 1-.6 1-.6 1-.5 1-.5.9-.4.9-.4.8-.4.9-.3.8-.3.8-.3.8-.2.8-.3.8-.1.7-.2.8-.2.7-.1.7-.1.7-.1.7v.7l-.1.7V108.8l.1.7v.6l.1.6.1.6.1.6.1.6.1.5.2.6.1.5.2.6.2.5.2.5.2.6.2.5.2.4.3.5.2.5.3.5.2.4.3.5.3.4.3.4.3.4.3.4.3.4.4.4.3.4.4.3.3.4.4.3.3.3.4.3.4.3.4.3.4.3.4.3.4.2.4.3.4.2.4.2.5.2.4.2.4.2.5.2.4.1.4.2.5.1.4.2.5.1.4.1.5.1h.4l.5.1.5.1h.9l.4.1h1l.4-.1h1l.4-.1.5-.1h.4l.5-.1.4-.1.5-.1.4-.2.5-.1.4-.2.5-.1.4-.2.4-.2.5-.2.4-.2.4-.2.4-.2.4-.3.4-.2.4-.3.4-.3.4-.3.4-.3.4-.3.3-.3.4-.3.4-.4.3-.3.4-.4.3-.4.3-.4.3-.4.3-.4.3-.4.3-.4.3-.5.3-.4.2-.5.3-.5.2-.5.2-.4.3-.5.2-.6.1-.5.2-.5.2-.6.2-.5.1-.6.1-.5.1-.6.1-.6.1-.6.1-.6.1-.6v-4l-.1-.7-.1-.7-.1-.7-.1-.7-.2-.7-.1-.8-.2-.7-.2-.8-.3-.8-.3-.8-.3-.8-.3-.8-.4-.9-.4-.8-.4-.9-.5-.9-.5-1-.6-1-.6-1-.7-1-.8-1.2-.9-1.2-1.1-1.3-1.1-1.4-1.5-1.7-2-2.1-4.9-5 4.9-5 2-2.1 1.5-1.7 1.1-1.4 1.1-1.3.9-1.2.8-1.1.7-1.1.6-1 .6-1 .5-.9.5-1 .4-.8.4-.9.4-.9.3-.8.3-.8.3-.8.3-.8.2-.8.2-.7.1-.8.2-.7.1-.7.1-.7.1-.7.1-.7V40.8l-.1-.6-.1-.7-.1-.6-.1-.5-.1-.6-.1-.6-.1-.6-.2-.5-.2-.6-.2-.5-.1-.5-.2-.5-.3-.5-.2-.5-.2-.5-.3-.5-.2-.4-.3-.5-.3-.4-.3-.5-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.4-.3-.3-.4-.4-.3-.4-.4-.3-.3-.4-.3-.4-.3-.4-.3-.4-.3-.4-.2-.4-.3-.4-.2-.4-.3-.4-.2-.4-.2-.5-.2-.4-.2-.4-.2-.5-.1-.4-.2-.5-.1-.4-.1-.5-.2-.4-.1h-.5l-.4-.1-.5-.1H77l-.5-.1h-1.4z"/>
  <path stroke={fill} fill="none" stroke-width=".5" d="M56.4 42.7v32.4M56.4 42.7H75"/>
  <path stroke={fill} fill="none" stroke-width=".5" d="M76.6 89.8h-3.2M76.6 88.8h-3.2"/>
  <path fill="#fff" stroke-width="0"  d="M58.1 117.3a1 1 0 100-2 1 1 0 000 2zM75 76a1 1 0 100-2 1 1 0 000 2zM59.7 31.9a1 1 0 100-2 1 1 0 000 2zM90.5 120.4a1 1 0 100-2 1 1 0 000 2z"/>
  <path stroke={fill} fill="none" stroke-miterlimit="10" stroke-width=".5" d="M79 6.8l2.9 2.9M81.9 6.8L79 9.7M8.9 69.1l1.4 1.5M11.8 69.1L8.9 72M81.7 36.6c-.3-.3-.6-.4-1-.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.4 0 .8-.2 1-.4M57.9 77.4c-.3-.3-.6-.4-1-.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.4 0 .8-.2 1-.4M81.9 16.5c-.3-.3-.6-.4-1-.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.4 0 .8-.2 1-.4M72.8 107.1H71v2.9M72.8 108.5H71M72.8 110.8v-1.1h-.6M72.8 32.7H71v2.9M72.8 34.2H71M54 121.6v-2.9h1.8v2.9M55.8 120.2H54M93.8 121.6v-2.9h1.8v1.5h.5v1.4h-2.3zM93.8 120.2h1.8M71 97.7h1.8v-1.4H71v2.9M55.7 82.2h2.4v1.3h-2.4v1.3h2.4M85.2 16.1h2.3v1.4h-2.3V19h2.3M56.1 28.8c-.3-.3-.6-.4-1-.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.4 0 .8-.2 1-.4M58.4 81h-2.9M82.3 17.5h.6l.6 1.5 1.1-3.5M27.2 69.3c-.3-.3-.6-.4-1-.4-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.4 0 .8-.2 1-.4M30.6 68.8h2.3v1.5h-2.3v1.4h2.3M27.7 70.3h.5l.6 1.4 1.2-3.4M66.6 32.7v2.9h1.1M64.9 37.3v-4.6M64.9 35h1.7M72.2 35.3h.6v.6h-.6v.6h.6"/>

  </svg>
);

const StyledLogo = styled(Logo)`
  margin: 20px auto;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 7s linear forwards;
  &:hover {

    path[fill] {
      stroke: ${"#0000FF"};
    }
  }
  
  @keyframes dash {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
`;

export default StyledLogo;
