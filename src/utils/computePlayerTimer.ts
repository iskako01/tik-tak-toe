import { GameSymbolType } from "consts";

export function computePlayerTimer(
  timers: Record<GameSymbolType, number> | null,
  currentMove: GameSymbolType,
  currentMoveStart: number,
  playerSymbol: GameSymbolType
) {
  const timer = timers ? timers[playerSymbol] : 10000;
  console.log({ timers, timer, playerSymbol, currentMoveStart });

  return {
    timer,
    timerStartAt: playerSymbol === currentMove ? currentMoveStart : 0,
  };
}
