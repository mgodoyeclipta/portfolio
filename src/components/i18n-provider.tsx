"use client";

import { useEffect } from "react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import en from "@/i18n/locales/en";
import es from "@/i18n/locales/es";

// Initialize with default 'en' so server and client first render agree
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    interpolation: { escapeValue: false },
  });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Detect language after mount to avoid SSR hydration mismatch
    const stored = localStorage.getItem("portfolio-language");
    const detected = navigator.language.startsWith("es") ? "es" : "en";
    const lang = stored ?? detected;
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
