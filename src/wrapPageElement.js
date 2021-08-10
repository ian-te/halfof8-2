const React = require("react");

const { ReducerProvider } = require("./reducers/root");
const { DarkThemeProvider } = require("./providers/ThemeProvider");
const { LocaleProvider } = require("./providers/LocaleProvider");

exports.wrapPageElement = ({ element, props: { pageContext } }) => {
  return (
    <DarkThemeProvider>
      <LocaleProvider locale={pageContext.language}>
        <ReducerProvider>{element}</ReducerProvider>
      </LocaleProvider>
    </DarkThemeProvider>
  );
};
