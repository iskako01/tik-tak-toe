import { GameSymbolType } from "consts";

export function computePlayerTimer(
  timers: Partial<Record<GameSymbolType, number>> | null,
  currentMove: GameSymbolType,
  currentMoveStart: number,
  playerSymbol: GameSymbolType,
  finalTimers?: Partial<Record<GameSymbolType, number>> | null
) {
  if (finalTimers) {
    return {
      timer: finalTimers[playerSymbol] ?? 0,
      timerStartAt: 0,
    };
  }

  const timer = timers ? (timers[playerSymbol] ?? 10000) : 10000;

  return {
    timer,
    timerStartAt: playerSymbol === currentMove ? currentMoveStart : 0,
  };
}
