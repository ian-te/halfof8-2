import React from "react";

export const Play = ({ className }) => {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    height="24px" 
    viewBox="0 0 24 24" 
    width="24px" 
    fill="#000000"
    >
    <path d="M4 0V24L23 12L4 0Z" />
    <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  );
};

export const Pause = ({ className }) => {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    height="24px" 
    viewBox="0 0 24 24" 
    width="24px" 
    fill="#000000"
    >
    <path d="M4 24H9.33333V0H4V24ZM14.6667 0V24H20V0H14.6667Z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  );
};
