"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type AnimationType = "blurInUp" | "fadeIn" | "slideUp" | "scaleUp";
type SplitBy = "word" | "character";

const variants: Record<AnimationType, { container: Variants; item: Variants }> = {
  blurInUp: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } },
    item: {
      hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
      visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    },
  },
  fadeIn: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } },
    },
  },
  slideUp: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    },
  },
  scaleUp: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
    item: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    },
  },
};

interface TextAnimateProps {
  children: string;
  animation?: AnimationType;
  by?: SplitBy;
  className?: string;
}

export function TextAnimate({
  children,
  animation = "blurInUp",
  by = "word",
  className,
}: TextAnimateProps) {
  const v = variants[animation];
  const segments = by === "character" ? children.split("") : children.split(" ");

  return (
    <motion.span
      key={children}
      className={cn("inline-block", className)}
      variants={v.container}
      initial="hidden"
      animate="visible"
    >
      {segments.map((seg, i) => (
        <motion.span key={i} variants={v.item} className="inline-block">
          {seg}
          {by === "word" && i < segments.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
