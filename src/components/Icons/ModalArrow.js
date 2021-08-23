import React from "react";

export default ({
  color = "white",
  width = "66",
  height = "66",
  direction = "right",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`rotate(${direction === "left" ? "180" : "0"}, 33, 33)`}>
        <path d="M63.9995 33L-0.000488281 33" stroke={color} stroke-width="2" />
        <path d="M32 65L64 33L32 1" stroke={color} stroke-width="2" />
      </g>
    </svg>
  );
};
