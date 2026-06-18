"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  // Keep next-themes in sync when the toggler toggles the DOM class directly
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const nextTheme = isDark ? "dark" : "light";
      if (nextTheme !== resolvedTheme) {
        setTheme(nextTheme);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [resolvedTheme, setTheme]);

  return (
    <AnimatedThemeToggler
      className={cn(
        "size-full flex items-center justify-center text-muted-foreground hover:text-foreground [&_svg]:size-4",
        className
      )}
    />
  );
}
