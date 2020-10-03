import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

export default () => {
  const { textColor: fill } = useContext(ThemeContext);
  return (
    <svg viewBox="0 0 150 150">
      <path
        d="M69.571 113l6.286-6.359L49.98 80.542H117v-9.084H49.98l25.877-26.181L69.571 39 33 76l36.571 37z"
        fill={fill}
      />
    </svg>
  );
};
