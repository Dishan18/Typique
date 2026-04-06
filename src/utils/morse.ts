const MORSE_FONT_VALUE = "__MORSE_CODE__";

const MORSE_MAP: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
};

export function isMorseFont(font: string): boolean {
  return font === MORSE_FONT_VALUE;
}

export function getFontFamily(font: string): string {
  if (isMorseFont(font)) {
    return '"IBM Plex Mono", monospace';
  }
  return font;
}

export function getRenderableText(text: string, font: string): string {
  if (!isMorseFont(font)) {
    return text;
  }

  return text
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .map((word) =>
          [...word]
            .map((char) => MORSE_MAP[char.toUpperCase()] ?? char)
            .join(" "),
        )
        .join(" / "),
    )
    .join("\n");
}

export { MORSE_FONT_VALUE };
