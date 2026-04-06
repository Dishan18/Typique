import { getFontFamily, renderTextForFont } from "./morse";

export type StyledRun = {
  text: string;
  font: string;
  inkColor: string;
};

export type StyledPage = {
  runs: StyledRun[];
};

export function createEmptyPage(): StyledPage {
  return { runs: [] };
}

export function getPagePlainText(page: StyledPage): string {
  return page.runs.map((run) => run.text).join("");
}

export function getPageRenderedText(page: StyledPage): string {
  return page.runs.map((run) => renderTextForFont(run.text, run.font)).join("");
}

export function appendTextToPage(
  page: StyledPage,
  text: string,
  font: string,
  inkColor: string,
): StyledPage {
  if (text.length === 0) return page;

  const runs = [...page.runs];
  const lastRun = runs[runs.length - 1];

  if (lastRun && lastRun.font === font && lastRun.inkColor === inkColor) {
    runs[runs.length - 1] = { ...lastRun, text: lastRun.text + text };
  } else {
    runs.push({ text, font, inkColor });
  }

  return { runs };
}

export function removeLastCharacter(page: StyledPage): StyledPage {
  if (page.runs.length === 0) return page;

  const runs = [...page.runs];
  const lastRun = runs[runs.length - 1];
  const updatedText = lastRun.text.slice(0, -1);

  if (updatedText.length === 0) {
    runs.pop();
  } else {
    runs[runs.length - 1] = { ...lastRun, text: updatedText };
  }

  return { runs };
}

export { getFontFamily };
