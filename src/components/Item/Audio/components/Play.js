import React from "react";

export const Play = ({ className }) => {
  return (
    <svg
      width="32"
      height="40"
      viewBox="0 0 32 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.666992 0.166748V39.8334L31.8337 20.0001L0.666992 0.166748Z"
        fill="white"
      />
    </svg>
  );
};

export const Pause = ({ className }) => {
  return (
    <svg
      width="34"
      height="40"
      viewBox="0 0 34 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 39.8334H11.3333V0.166748H0V39.8334ZM22.6667 0.166748V39.8334H34V0.166748H22.6667Z"
        fill="white"
      />
    </svg>
  );
};
