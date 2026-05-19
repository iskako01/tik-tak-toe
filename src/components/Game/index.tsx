"use client";

import { useCallback, useMemo } from "react";
import { GameSymbols } from "consts";
import { Player } from "@components/Player/PlayerInterface";
import avatar from "../../../public/avatar.png";
import ModalWinner from "@components/Modals/Winner";
import GameTitle from "./Title";
import GameInfo from "./Info";
import GameField from "./Field";
import { computeWinner } from "utils/computeWinner";
import { getNextMove } from "utils/getNextMove";
import { useGameStore } from "store/gameStore";
import useInterval from "hooks/useInterval";

export default function Game() {
  const playersCount = 2;

  const cells = useGameStore((state) => state.cells);
  const currentMove = useGameStore((state) => state.currentMove);
  const currentMoveStart = useGameStore((state) => state.currentMoveStart);
  const lastMoveIndex = useGameStore((state) => state.lastMoveIndex);
  const timers = useGameStore((state) => state.timers);

  const initGameState = useGameStore((state) => state.initGameState);
  const handleTick = useGameStore((state) => state.handleTick);
  const playerSymbols = useGameStore((state) => state.playerSymbols);
  const winSequenceSize = useGameStore((state) => state.winSequenceSize);
  const fieldSize = useGameStore((state) => state.fieldSize);
  const isStarted = useGameStore((state) => state.isStarted);
  const isDraw = useGameStore((state) => state.isDraw);
  const declareDraw = useGameStore((state) => state.declareDraw);
  const surrender = useGameStore((state) => state.surrender);

  const winnerSequence = useMemo(
    () => computeWinner(cells, lastMoveIndex, winSequenceSize, fieldSize),
    [cells, lastMoveIndex, winSequenceSize, fieldSize]
  );
  const nextMove = getNextMove(currentMove, playersCount, timers, playerSymbols);
  const timedOutWinner = timers !== null && currentMove === nextMove ? currentMove : null;
  const winner = timedOutWinner ?? cells[winnerSequence[0]] ?? null;
  const isBoardFull = cells.length > 0 && cells.every((cell) => cell !== null);
  const effectiveDraw = isDraw || (isBoardFull && !winner);

  useInterval(
    1000,
    !!currentMoveStart && !winner && !effectiveDraw,
    useCallback(() => {
      handleTick(Date.now());
    }, [])
  );

  const players: Player[] = [
    {
      id: 1,
      avatar: "",
      name: "PlayerPlayerPlayerPlayerPlayerPlayerPlayer 1",
      rating: 1111,
      symbol: playerSymbols[0],
    },
    {
      id: 2,
      avatar: avatar,
      name: "Player 2",
      rating: 2222,
      symbol: playerSymbols[1],
    },
    {
      id: 3,
      avatar: avatar,
      name: "Player 3",
      rating: 3333,
      symbol: playerSymbols[2] ?? GameSymbols.TRIANGLE,
    },
    {
      id: 4,
      avatar: avatar,
      name: "Player 4",
      rating: 4444,
      symbol: playerSymbols[3] ?? GameSymbols.SQUARE,
    },
  ].slice(0, playersCount);

  function handlePlayAgain() {
    initGameState(playersCount, 10000, Date.now());
  }

  function handlePlayersTimeOver() {
    console.log("handlePlayersTimeOver");
  }

  const winnerPlayer = players.find((player) => player.symbol === winner);

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-slate-400">
        <span className="text-xl">Press <strong className="text-teal-600">Play</strong> to start the game</span>
      </div>
    );
  }

  return (
    <>
      <GameTitle playersCount={playersCount} timeMode="1 min per move" />
      <ModalWinner
        winnerPlayer={winnerPlayer ?? null}
        isDraw={effectiveDraw}
        winnerSequence={winnerSequence}
        players={players}
        onClose={handlePlayAgain}
        playAgain={handlePlayAgain}
      />
      <GameInfo
        className="my-4"
        playersCount={playersCount}
        players={players}
        isWinner={!!winner}
        onPlayerTimeOver={handlePlayersTimeOver}
      />
      <GameField
        currentMove={currentMove}
        nextMove={nextMove}
        winnerSequence={winnerSequence}
        winner={winner}
        onDraw={declareDraw}
        onSurrender={() => surrender(Date.now())}
      />
    </>
  );
}
