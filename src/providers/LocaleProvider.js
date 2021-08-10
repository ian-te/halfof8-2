import React, { useContext } from "react";

const LocaleContext = React.createContext({ locale: "en-US" });

export const useLocale = () => {
  const context = useContext(LocaleContext);
  return context.locale;
};

export const LocaleProvider = ({ children, locale }) => {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
};
