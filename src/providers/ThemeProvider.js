import React, { useState, useEffect } from "react";
import * as themes from "../theme";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
`;

export const DarkThemeProvider = ({ children }) => {
  let [isDarkTheme, toggleTheme] = useState(false);
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      toggleTheme(true);
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", e => {
        toggleTheme(e.matches);
      });
  }, []);

  //   const action = () => {
  //     toggleTheme((isDarkTheme = !isDarkTheme));
  //   };

  return (
    <ThemeProvider theme={isDarkTheme ? themes.darkTheme : themes.lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
