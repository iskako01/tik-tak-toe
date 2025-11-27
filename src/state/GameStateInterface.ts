import { GameSymbolType } from "consts";

export interface GameStateInterface {
  cells: (GameSymbolType | null)[];
  currentMove: GameSymbolType;
  lastMoveIndex: number | null;
  timers: GameSymbolType[];
  playersCount: number;
  currentMoveStart: number;
}

export interface InitGameStateInterface {
  playersCount: number;
  defaultTimer: GameSymbolType;
  currentMoveStart: number;
}

export interface TimerInterface {
  timers: GameSymbolType[];
  symbol: GameSymbolType;
  index: number;
}
