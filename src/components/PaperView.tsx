import React from "react";
import { motion } from "motion/react";
import { getFontFamily, getRenderableText } from "../utils/morse";

interface PaperViewProps {
  text: string;
  font: string;
  inkColor: string;
  paperColor: string;
  onPaperClick: () => void;
  isTyping: boolean;
  lastKeystroke: number;
}

export function PaperView({
  text,
  font,
  inkColor,
  paperColor,
  onPaperClick,
  isTyping,
  lastKeystroke,
}: PaperViewProps) {
  const renderedText = getRenderableText(text, font);
  const lines = renderedText.split("\n");
  const lineHeight = 28; // px

  return (
    <div
      className="flex-1 relative overflow-hidden cursor-pointer"
      onClick={onPaperClick}
      title="Tap to view full page"
    >
      {/* Typewriter Body Background (subtle) */}
      <div className="absolute bottom-0 w-full h-24 bg-green-300 rounded-t-3xl shadow-[0_-10px_40px_rgba(134,239,172,0.3)] opacity-30 pointer-events-none z-10 border-t-4 border-green-400"></div>

      {/* Typewriter Handle */}
      <motion.div
        className="absolute right-[calc(50%-20rem)] sm:right-[calc(50%-24rem)] bottom-12 w-6 sm:w-8 h-16 sm:h-20 bg-green-200 rounded-r-xl shadow-lg z-20 hidden md:block origin-left border-2 border-green-300"
        animate={{
          rotateX:
            text.endsWith("\n") && lastKeystroke > Date.now() - 500
              ? [0, -45, 0]
              : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute right-[-8px] sm:right-[-10px] top-1/2 -translate-y-1/2 w-3 sm:w-4 h-10 sm:h-12 bg-green-400 rounded-full shadow-inner"></div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 w-[95%] max-w-2xl shadow-[0_0_30px_rgba(0,0,0,0.1)] p-6 sm:p-12 origin-bottom"
        style={{
          x: "-50%",
          top: "70%", // Typing line is fixed at 70% from top of container
          height: "1200px", // Fixed tall paper
          backgroundColor: paperColor,
          color: inkColor,
          fontFamily: getFontFamily(font),
          fontSize: "1.125rem",
          lineHeight: `${lineHeight}px`,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
        animate={{
          y: -(lines.length * lineHeight),
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {renderedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2.5 h-5 bg-current align-middle ml-0.5"
        />
      </motion.div>
    </div>
  );
}
