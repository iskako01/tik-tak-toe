"use client";

import GameMoveInfo from "./MoveInfo";
import { GameSymbolType } from "consts";
import GameCells from "./Cells";

interface GameFieldPropsInterface {
  currentMove: GameSymbolType;
  nextMove: GameSymbolType;
  winnerSequence: number[];
  winner: GameSymbolType | null;
  onDraw: () => void;
  onSurrender: () => void;
}

export default function GameField({
  currentMove,
  nextMove,
  winnerSequence,
  winner,
  onDraw,
  onSurrender,
}: GameFieldPropsInterface) {
  return (
    <div className="shadow-md bg-white rounded-2xl w-full">
      <div className="px-8 py-5">
        <GameMoveInfo currentMove={currentMove} nextMove={nextMove} onDraw={onDraw} onSurrender={onSurrender} />

        <GameCells
          winnerSequence={winnerSequence}
          winner={winner}
        />
      </div>
    </div>
  );
}
