import React from "react";
import { PAPER_COLORS, INK_COLORS, FONTS } from "../constants";
import { Download, Volume2, VolumeX, Settings2 } from "lucide-react";
import jsPDF from "jspdf";

interface ToolbarProps {
  paperColor: string;
  setPaperColor: (val: string) => void;
  inkColor: string;
  setInkColor: (val: string) => void;
  font: string;
  setFont: (val: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onExportClick: () => void;
}

export function Toolbar({
  paperColor,
  setPaperColor,
  inkColor,
  setInkColor,
  font,
  setFont,
  soundEnabled,
  setSoundEnabled,
  onExportClick,
}: ToolbarProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-xl border-2 border-blue-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-3 sm:gap-6 z-50 transition-all hover:shadow-2xl max-w-[95vw] overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Settings2 className="w-4 h-4 text-blue-400" />
        <select
          value={paperColor}
          onChange={(e) => setPaperColor(e.target.value)}
          className="bg-transparent text-xs sm:text-sm font-bold text-blue-600 outline-none cursor-pointer"
        >
          {PAPER_COLORS.map((c) => (
            <option key={c.id} value={c.value}>
              {c.name} Paper
            </option>
          ))}
        </select>
      </div>

      <div className="w-px h-4 bg-blue-200 shrink-0"></div>

      <select
        value={inkColor}
        onChange={(e) => setInkColor(e.target.value)}
        className="bg-transparent text-xs sm:text-sm font-bold text-blue-600 outline-none cursor-pointer shrink-0"
      >
        {INK_COLORS.map((c) => (
          <option key={c.id} value={c.value}>
            {c.name} Ink
          </option>
        ))}
      </select>

      <div className="w-px h-4 bg-blue-200 shrink-0"></div>

      <select
        value={font}
        onChange={(e) => {
          setFont(e.target.value);
          e.currentTarget.blur();
        }}
        className="bg-transparent text-xs sm:text-sm font-bold text-blue-600 outline-none cursor-pointer w-24 sm:w-32 shrink-0"
      >
        {FONTS.map((c) => (
          <option key={c.id} value={c.value}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="w-px h-4 bg-blue-200 shrink-0"></div>

      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="text-blue-400 hover:text-blue-600 transition-colors shrink-0"
        title={soundEnabled ? "Mute typing sounds" : "Enable typing sounds"}
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>

      <div className="w-px h-4 bg-blue-200 shrink-0"></div>

      <button
        onClick={onExportClick}
        className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
      >
        <Download className="w-4 h-4" />
        Export
      </button>
    </div>
  );
}
