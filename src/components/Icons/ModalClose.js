import React from "react";

export default ({ color = "white", width = "66", height = "66" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L65 65" stroke={color} stroke-width="2" />
      <path d="M1 65L65 0.999997" stroke={color} stroke-width="2" />
    </svg>
  );
};
