"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { DockIcon } from "@/components/magicui/dock";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      animate={{
        width: visible ? 40 : 0,
        opacity: visible ? 1 : 0,
        marginLeft: visible ? 0 : -8,
      }}
      initial={{ width: 0, opacity: 0, marginLeft: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      style={{ overflow: "hidden", flexShrink: 0 }}
    >
      <div style={{ width: 40 }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
            >
              <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                <ArrowUp className="size-full rounded-sm overflow-hidden object-contain" />
              </DockIcon>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>Back to top</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
      </div>
    </motion.div>
  );
}
