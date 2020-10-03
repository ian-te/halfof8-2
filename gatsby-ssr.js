const React = require("react");
const { DarkThemeProvider } = require("./src/providers/ThemeProvider");

// exports.wrapPageElement = ({ element, props }) => {
//   return element;
// };
exports.wrapRootElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it

  return <DarkThemeProvider>{element}</DarkThemeProvider>;
};
