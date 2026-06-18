"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("es") ? "es" : "en";

  function toggle() {
    const next = current === "en" ? "es" : "en";
    localStorage.setItem("portfolio-language", next);
    i18n.changeLanguage(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "size-full flex items-center justify-center text-xs font-bold",
        className
      )}
    >
      {current === "en" ? "EN" : "ES"}
    </button>
  );
}
