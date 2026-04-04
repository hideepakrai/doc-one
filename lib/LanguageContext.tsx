"use client";

import React, { createContext, useContext, useState } from "react";
import en from "./locales/en.json";
import hi from "./locales/hi.json";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /**
   * Translates a key based on the current or provided language.
   * Supports nested keys like "header.nav.doctors"
   */
  t: (key: string, langOverride?: Language) => any;
}

const translations = { en, hi };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string, langOverride?: Language) => {
    const keys = key.split(".");
    let result: any = translations[langOverride || language];
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
