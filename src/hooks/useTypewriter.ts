import { useState, useEffect, useCallback, useRef } from "react";

const MAX_LINES_PER_PAGE = 40;
const MAX_CHARS_PER_LINE = 50;

export function useTypewriter(viewMode: "typing" | "full-page") {
  const [pages, setPages] = useState<string[]>([""]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [lastKeystroke, setLastKeystroke] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = useCallback(
    (isEnter: boolean = false) => {
      if (!soundEnabled) return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext || (window as any).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (isEnter) {
          // Ding sound for carriage return
          osc.type = "sine";
          osc.frequency.setValueAtTime(1200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(
            600,
            ctx.currentTime + 0.2,
          );
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } else {
          // Clack sound for normal keys
          osc.type = "square";
          osc.frequency.setValueAtTime(400, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(
            100,
            ctx.currentTime + 0.05,
          );
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }

        osc.connect(gain);
        gain.connect(ctx.destination);
      } catch (e) {
        console.error("Audio playback failed", e);
      }
    },
    [soundEnabled],
  );

  const processInputKey = useCallback(
    (key: string) => {
      setIsTyping(true);
      setLastKeystroke(Date.now());

      if (key.length === 1 || key === "Backspace" || key === "Enter") {
        playSound(key === "Enter");
      }

      setPages((prevPages: string[]) => {
        const newPages = [...prevPages];
        const currentText = newPages[currentPageIndex];
        const lines = currentText.split("\n");
        const currentLine = lines[lines.length - 1];

        if (key === "Backspace") {
          if (currentText.length > 0) {
            newPages[currentPageIndex] = currentText.slice(0, -1);
          }
        } else if (key === "Enter") {
          if (lines.length >= MAX_LINES_PER_PAGE) {
            newPages.push("");
            setCurrentPageIndex(newPages.length - 1);
          } else {
            newPages[currentPageIndex] = currentText + "\n";
          }
        } else if (key.length === 1) {
          if (currentLine.length >= MAX_CHARS_PER_LINE) {
            if (lines.length >= MAX_LINES_PER_PAGE) {
              newPages.push(key);
              setCurrentPageIndex(newPages.length - 1);
            } else {
              newPages[currentPageIndex] = currentText + "\n" + key;
            }
          } else {
            newPages[currentPageIndex] = currentText + key;
          }
        }

        return newPages;
      });
    },
    [currentPageIndex, playSound],
  );

  const typeVirtualKey = useCallback(
    (key: string) => {
      if (viewMode !== "typing") return;
      processInputKey(key);
    },
    [viewMode, processInputKey],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (viewMode !== "typing") return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === "Tab" || e.key.startsWith("F") || e.key === "Escape")
        return;

      if (e.key === " " || e.key === "Enter" || e.key === "Backspace") {
        e.preventDefault();
      }

      setPressedKeys((prev: Set<string>) => {
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });
      processInputKey(e.key);
    },
    [viewMode, processInputKey],
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setPressedKeys((prev: Set<string>) => {
      const next = new Set(prev);
      next.delete(e.code);
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => setIsTyping(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [isTyping, lastKeystroke]);

  const addNewPage = useCallback(() => {
    setPages((prev: string[]) => {
      const next = [...prev, ""];
      setCurrentPageIndex(next.length - 1);
      return next;
    });
  }, []);

  return {
    pages,
    setPages,
    currentPageIndex,
    setCurrentPageIndex,
    addNewPage,
    isTyping,
    lastKeystroke,
    soundEnabled,
    setSoundEnabled,
    pressedKeys,
    typeVirtualKey,
  };
}
