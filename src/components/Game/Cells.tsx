"use-client";

import { GameSymbolType } from "consts";
import { useGameStore } from "store/gameStore";
import { GameCell } from "./Cell";
import { useCallback } from "react";

interface GameCellsPropsinterface {
  winnerSequence: number[];
  winner: GameSymbolType | null;
}

export default function GameCells({
  winnerSequence,
  winner,
}: GameCellsPropsinterface) {
  const cells = useGameStore((state) => state.cells);
  const cellClick = useGameStore((state) => state.cellClick);

  const handleCellClick = useCallback(
    (index: number) => cellClick(index, Date.now()),
    []
  );

  return (
    <div className="grid">
      <div className="grid grid-cols-[repeat(17,_30px)] grid-rows-[repeat(17,_30px)] gap-0 m-auto">
        {cells.map((cell, index) => {
          return (
            <GameCell
              key={index}
              index={index}
              onClick={() => handleCellClick(index)}
              symbol={cell}
              disabled={!!winner}
              isWinner={winnerSequence.includes(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
