import { GameSymbolType } from "consts";
import { MOVE_ORDER } from "lib/constants";

export function getNextMove(
  currentMove: GameSymbolType,
  playersCount: number,
  timers: Partial<Record<GameSymbolType, number>> | null,
  playerSymbols?: GameSymbolType[]
) {
  const order = (playerSymbols ?? MOVE_ORDER).slice(0, playersCount);
  const active = order.filter((symbol) => {
    if (!timers) return true;
    return (timers[symbol] ?? 0) > 0;
  });

  const nextIndex = active.indexOf(currentMove) + 1;
  return active[nextIndex] ?? active[0];
}
