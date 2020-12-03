const React = require("react");

const { ThemeProvider } = require("styled-components");
const { ReducerProvider } = require("./reducers/root");
const { DarkThemeProvider } = require("./providers/ThemeProvider");
// import { ThemeProvider } from "styled-components";
// import { darkTheme } from "./theme";

const wrapRootElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <DarkThemeProvider>
      <ReducerProvider>{element}</ReducerProvider>
    </DarkThemeProvider>
  );
};

exports.wrapRootElement = wrapRootElement;
