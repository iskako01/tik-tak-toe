import { getNextMove, computeWinner } from "models/model";
import { GameSymbolsEnum } from "enums";
import { useState } from "react";

interface GameStateInterface {
  cells: (GameSymbolsEnum | null)[];
  currentMove: GameSymbolsEnum;
  lastMoveIndex: number | null;
}

export function useGameState(playersCount: number) {
  const [{ cells, currentMove, lastMoveIndex }, setGameState] =
    useState<GameStateInterface>(() => ({
      cells: new Array(17 * 17).fill(null),
      currentMove: GameSymbolsEnum.CROSS,
      lastMoveIndex: null,
    }));

  const winnerSequence = computeWinner(cells, lastMoveIndex);
  const nextMove = getNextMove(currentMove, playersCount);

  function setCurrentMove() {
    setGameState((lastGameState) => {
      console.log(1, lastGameState.currentMove);
      console.log(2, getNextMove(lastGameState.currentMove, playersCount));
      return {
        ...lastGameState,
        currentMove: getNextMove(lastGameState.currentMove, playersCount),
      };
    });
    console.log({ currentMove });
  }

  function handleCellClick(index: number) {
    if (cells[index] || !!winnerSequence.length) return;

    setGameState((lastGameState) => {
      if (lastGameState.cells[index]) {
        return lastGameState;
      }

      return {
        ...lastGameState,
        cells: lastGameState.cells.map((cell, cellIndex) =>
          cellIndex === index ? lastGameState.currentMove : cell
        ),
        currentMove: getNextMove(lastGameState.currentMove, playersCount),
        lastMoveIndex: index,
      };
    });
  }

  return {
    cells,
    currentMove,
    nextMove,
    winnerSequence,
    handleCellClick,
    setCurrentMove,
  };
}
