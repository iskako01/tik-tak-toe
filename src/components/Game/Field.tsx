"use client";

import GameMoveInfo from "./MoveInfo";
import GameCell from "./Cell";
import { GameSymbolsEnum } from "enums";

interface GameFieldPropsInterface {
  cells: (GameSymbolsEnum | null)[];
  currentMove: GameSymbolsEnum;
  nextMove: GameSymbolsEnum;
  winnerSequence: number[];
  handleCellClick: (index: number) => void;
}

export default function GameField({
  cells,
  currentMove,
  nextMove,
  handleCellClick,
  winnerSequence,
}: GameFieldPropsInterface) {
  return (
    <div className="shadow-md bg-white rounded-2xl w-full">
      <div className="px-8 py-5">
        <GameMoveInfo currentMove={currentMove} nextMove={nextMove} />

        <div className="grid">
          <div className="grid grid-cols-[repeat(17,_30px)] grid-rows-[repeat(17,_30px)] gap-0 m-auto">
            {cells.map((cell, index) => {
              return (
                <GameCell
                  key={index}
                  onClick={() => handleCellClick(index)}
                  symbol={cell}
                  isWinner={winnerSequence.includes(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
