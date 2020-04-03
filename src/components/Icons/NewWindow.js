import React from "react";

export const NewWindow = ({ width }) => (
  <svg
    style={{ display: "block" }}
    width={width}
    height={width}
    viewBox={`0 0 24 24`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.3333 21.3333H2.66667V2.66667H12V0H2.66667C1.18667 0 0 1.2 0 2.66667V21.3333C0 22.8 1.18667 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333V12H21.3333V21.3333ZM14.6667 0V2.66667H19.4533L6.34667 15.7733L8.22667 17.6533L21.3333 4.54667V9.33333H24V0H14.6667Z"
      fill="black"
    />
  </svg>
);
