"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function scramble(target: string, progress: number): string {
  const nonSpaceCount = target.replace(/ /g, "").length;
  let nonSpaceIdx = 0;
  return target
    .split("")
    .map((char) => {
      if (char === " ") return " ";
      const threshold = nonSpaceIdx / nonSpaceCount;
      nonSpaceIdx++;
      return progress >= threshold
        ? char
        : CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

export function useHyperText(text: string, duration = 500): string {
  const [output, setOutput] = useState(text);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const tick = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      setOutput(scramble(text, progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, duration]);

  return output;
}

export function HyperText({
  children,
  className,
  duration = 500,
}: {
  children: string;
  className?: string;
  duration?: number;
}) {
  const output = useHyperText(children, duration);
  return <span className={cn(className)}>{output}</span>;
}
