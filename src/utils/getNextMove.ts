import { GameSymbolType } from "consts";
import { MOVE_ORDER } from "lib/constants";

export function getNextMove(
  currentMove: GameSymbolType,
  playersCount: number,
  timers: Partial<Record<GameSymbolType, number>> | null
) {
  const slicedMoveOrder = MOVE_ORDER.slice(0, playersCount).filter((symbol) => {
    if (!timers) {
      return;
    }

    return (timers[symbol] ?? 0) > 0;
  });

  const nextMoveOrder = slicedMoveOrder.indexOf(currentMove) + 1;
  return slicedMoveOrder[nextMoveOrder] ?? slicedMoveOrder[0];
}
