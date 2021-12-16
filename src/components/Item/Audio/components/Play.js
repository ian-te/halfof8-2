import React from "react";

export const Play = ({ className }) => {
  return (
    <svg 
    width="24" height="24" viewBox="0 0 24 24" 
    fill="#000000"
    >
    <path d="M20.5 12L7 2V22L20.5 12Z" fill="black"/>
    </svg>
  );
};

export const Pause = ({ className }) => {
  return (
    <svg 
    width="24" height="24" viewBox="0 0 24 24" 
    fill="#000000"
    >
    <path d="M6 4H10V20H6V4Z" fill="black"/>
    <path d="M14 4H18V20H14V4Z" fill="black"/>
    </svg>
  );
};
