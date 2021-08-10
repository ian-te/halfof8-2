const React = require("react");

const { ReducerProvider } = require("./reducers/root");
const { DarkThemeProvider } = require("./providers/ThemeProvider");

const wrapRootElement = ({ element, pageContext }) => {
  console.log(">>>", pageContext);
  return (
    <DarkThemeProvider>
      <ReducerProvider>
        {JSON.stringify(pageContext)} {element}
      </ReducerProvider>
    </DarkThemeProvider>
  );
};

exports.wrapRootElement = wrapRootElement;
