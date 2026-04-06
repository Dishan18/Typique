import React, { useEffect, useState } from "react";
import { useTypewriter } from "./hooks/useTypewriter";
import { Toolbar } from "./components/Toolbar";
import { TutorialModal } from "./components/TutorialModal";
import { PaperView } from "./components/PaperView";
import { PageManager } from "./components/PageManager";
import { ExportModal } from "./components/ExportModal";
import { TypewriterKeyboard } from "./components/TypewriterKeyboard";
import { PAPER_COLORS, INK_COLORS, FONTS } from "./constants";

const FONT_STORAGE_KEY = "typique:selected-font";

function getInitialFont(): string {
  if (typeof window === "undefined") {
    return FONTS[0].value;
  }

  const savedFont = window.localStorage.getItem(FONT_STORAGE_KEY);
  if (!savedFont) {
    return FONTS[0].value;
  }

  const isSupportedFont = FONTS.some(
    (fontOption) => fontOption.value === savedFont,
  );
  return isSupportedFont ? savedFont : FONTS[0].value;
}

export default function App() {
  const [viewMode, setViewMode] = useState<"typing" | "full-page">("typing");
  const {
    pages,
    currentPageIndex,
    pressedKeys,
    lastKeystroke,
    isTyping,
    addNewPage,
    setCurrentPageIndex,
    soundEnabled,
    setSoundEnabled,
    typeVirtualKey,
  } = useTypewriter(viewMode);

  const [paperColor, setPaperColor] = useState(PAPER_COLORS[1].value); // Cream default
  const [inkColor, setInkColor] = useState(INK_COLORS[0].value); // Black default
  const [font, setFont] = useState(getInitialFont); // Courier Prime default
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    const title =
      viewMode === "typing"
        ? "Typique | Vintage Typewriter Simulator"
        : "Typique | Page Manager";
    document.title = title;

    const description =
      viewMode === "typing"
        ? "Write in a vintage typewriter simulator with customizable paper, ink, and sound."
        : "Manage your Typique pages and continue writing with a vintage typewriter experience.";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);
  }, [viewMode]);

  useEffect(() => {
    window.localStorage.setItem(FONT_STORAGE_KEY, font);
  }, [font]);

  return (
    <main className="flex flex-col h-[100dvh] w-full bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100 relative overflow-hidden transition-colors duration-500">
      <h1 className="sr-only">Typique Vintage Typewriter Simulator</h1>
      <p className="sr-only">
        A focused writing app with realistic typewriter styling, multi-page
        writing, and export to PDF or text.
      </p>
      {/* Cute Flickering Background Elements */}
      <div className="absolute top-[10%] left-[10%] text-yellow-300 animate-flicker-fast text-4xl drop-shadow-lg pointer-events-none">
        ✨
      </div>
      <div className="absolute top-[20%] right-[15%] text-yellow-200 animate-flicker-slow text-5xl drop-shadow-lg pointer-events-none">
        ⭐
      </div>
      <div className="absolute bottom-[30%] left-[15%] text-green-300 animate-flicker text-3xl drop-shadow-lg pointer-events-none">
        ✨
      </div>
      <div className="absolute bottom-[20%] right-[10%] text-blue-300 animate-flicker-fast text-4xl drop-shadow-lg pointer-events-none">
        🌟
      </div>
      <div className="absolute top-[40%] left-[5%] text-white animate-flicker-slow text-6xl opacity-60 drop-shadow-md pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-[15%] right-[40%] text-white animate-flicker text-5xl opacity-50 drop-shadow-md pointer-events-none">
        ☁️
      </div>

      {viewMode === "typing" && (
        <Toolbar
          paperColor={paperColor}
          setPaperColor={setPaperColor}
          inkColor={inkColor}
          setInkColor={setInkColor}
          font={font}
          setFont={setFont}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          onExportClick={() => setIsExportModalOpen(true)}
        />
      )}

      {viewMode === "typing" ? (
        <PaperView
          text={pages[currentPageIndex]}
          font={font}
          inkColor={inkColor}
          paperColor={paperColor}
          onPaperClick={() => setViewMode("full-page")}
          isTyping={isTyping}
          lastKeystroke={lastKeystroke}
        />
      ) : (
        <PageManager
          pages={pages}
          currentPageIndex={currentPageIndex}
          onBack={() => setViewMode("typing")}
          onSelectPage={setCurrentPageIndex}
          onNewPage={addNewPage}
          font={font}
          inkColor={inkColor}
          paperColor={paperColor}
        />
      )}

      {viewMode === "typing" && (
        <div className="shrink-0 z-30">
          <TypewriterKeyboard
            pressedKeys={pressedKeys}
            onVirtualKeyPress={typeVirtualKey}
          />
        </div>
      )}

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        pages={pages}
        font={font}
        inkColor={inkColor}
        paperColor={paperColor}
      />

      <TutorialModal />
    </main>
  );
}
