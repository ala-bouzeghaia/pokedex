import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const languageContextDefaultValues: LanguageContextType = {
  language: "fr",
  setLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(
  languageContextDefaultValues
);

export function useLanguage() {
  return useContext(LanguageContext);
}

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<string>("fr");
  // const [auth, setAuth] = useState<AuthType>({});
  // console.log("prov auth", auth);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
