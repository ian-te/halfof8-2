const LocaleContext = React.createContext({ locale: "en-US" });

export const useLocale = () => {
  const context = useContext(LocaleContext);
};
