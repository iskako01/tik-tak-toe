import { GameSymbolType } from "consts";

export type TimerInterface = Partial<Record<GameSymbolType, number>>;

export interface GameStateInterface {
  cells: (GameSymbolType | null)[];
  currentMove: GameSymbolType;
  lastMoveIndex: number | null;
  timers: TimerInterface;
  playersCount: number;
  currentMoveStart: number;
}

export interface InitGameStateInterface {
  playersCount: number;
  defaultTimer: number;
  currentMoveStart: number;
}
