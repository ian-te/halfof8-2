const React = require("react");

const { ThemeProvider } = require("styled-components");
const { darkTheme, lightTheme } = require("./theme");
// import { ThemeProvider } from "styled-components";
// import { darkTheme } from "./theme";

const wrapRootElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <ThemeProvider theme={darkTheme} {...props}>
      {element}
    </ThemeProvider>
  );
};

exports.wrapRootElement = wrapRootElement;
