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
  const fieldSize = useGameStore((state) => state.fieldSize);

  const handleCellClick = useCallback(
    (index: number) => cellClick(index, Date.now()),
    []
  );

  const cellSize = fieldSize <= 3 ? 80 : fieldSize <= 7 ? 50 : 30;

  return (
    <div className="grid">
      <div
        className="gap-0 m-auto"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${fieldSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${fieldSize}, ${cellSize}px)`,
        }}
      >
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
