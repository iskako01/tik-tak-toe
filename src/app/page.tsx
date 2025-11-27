"use client";

import GameField from "@components/Game/Field";
import GameInfo from "@components/Game/Info";
import GameTitle from "@components/Game/Title";
import { useGameState } from "hooks/useGameState";
import { useState } from "react";

export default function HomePage() {
  const [playersCount] = useState(4);
  const { cells, currentMove, nextMove, handleCellClick, winnerSequence } =
    useGameState(playersCount);

  return (
    <div>
      <GameTitle playersCount={playersCount} />
      <GameInfo
        className="my-4"
        currentMove={currentMove}
        playersCount={playersCount}
        isWinner={!!winnerSequence.length}
      />
      <GameField
        cells={cells}
        currentMove={currentMove}
        nextMove={nextMove}
        handleCellClick={handleCellClick}
        winnerSequence={winnerSequence}
      />
    </div>
  );
}
