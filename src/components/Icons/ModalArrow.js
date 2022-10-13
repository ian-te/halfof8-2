import React from "react";

export default function ModalArrow({
  color = "white",
  width = "66",
  height = "66",
  direction = "right",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="100"
        y="100"
        width="100"
        height="100"
        rx="50"
        fill={color}
        fill-opacity="0.1"
      />
      <path
        d="M37.7158 78L66.0001 49.7157L37.7158 21.4315"
        stroke={color}
        transform={`rotate(${direction === "left" ? "180" : "0"}, 50, 50)`}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
