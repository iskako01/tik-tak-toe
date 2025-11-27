export const GameSymbols = {
  ZERO: "zero",
  CROSS: "cross",
  TRIANGLE: "triangle",
  SQUARE: "square",
} as const;

export type GameSymbolType = (typeof GameSymbols)[keyof typeof GameSymbols];
