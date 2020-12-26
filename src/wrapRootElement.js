const React = require("react");

const { ReducerProvider } = require("./reducers/root");
const { DarkThemeProvider } = require("./providers/ThemeProvider");

const wrapRootElement = ({ element }) => {
  return (
    <DarkThemeProvider>
      <ReducerProvider>{element}</ReducerProvider>
    </DarkThemeProvider>
  );
};

exports.wrapRootElement = wrapRootElement;
