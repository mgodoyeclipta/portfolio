"use client";

import { Button } from "@/components/ui/button";
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
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      onClick={toggle}
    >
      <span className="text-xs font-bold leading-none">
        {current === "en" ? "EN" : "ES"}
      </span>
    </Button>
  );
}
