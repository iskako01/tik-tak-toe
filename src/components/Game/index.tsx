"use client";

import { useCallback, useEffect, useMemo } from "react";
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

  const winnerSequence = useMemo(
    () => computeWinner(cells, lastMoveIndex),
    [cells, lastMoveIndex]
  );
  const nextMove = getNextMove(currentMove, playersCount, timers, playerSymbols);
  const timedOutWinner = timers !== null && currentMove === nextMove ? currentMove : null;
  const winner = timedOutWinner ?? cells[winnerSequence[0]] ?? null;

  useEffect(() => {
    initGameState(playersCount, 10000, Date.now());
  }, [playersCount]);

  useInterval(
    1000,
    !!currentMoveStart && !winner,
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

  return (
    <>
      <GameTitle playersCount={playersCount} timeMode="1 min per move" />
      <ModalWinner
        winnerName={winnerPlayer?.name || ""}
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
      />
    </>
  );
}
