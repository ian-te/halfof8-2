import React, { useState, useEffect } from "react";
import * as themes from "../theme";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    padding: 0;
    margin: 0;
  }
`;

export const DarkThemeProvider = ({ children }) => {
  let [isDarkTheme, toggleTheme] = useState(false);
  useEffect(() => {
    if (
      window &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      toggleTheme(true);
    }
    window &&
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", e => {
          toggleTheme(e.matches);
        });
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? themes.darkTheme : themes.lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
