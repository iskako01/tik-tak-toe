import avatar from "../../../public/avatar.png";
import Divider from "@components/Divider";
import Player from "@components/Player";
import GameTimer from "./Timer";
import { GameSymbolsEnum } from "enums";

interface GameInfoPropsInterface {
  className?: string;
  playersCount: number;
  currentMove: GameSymbolsEnum;
  isWinner: boolean;
}

export default function GameInfo({
  className = "",
  playersCount,
  currentMove,
  isWinner,
}: GameInfoPropsInterface) {
  const playersInfo = [
    {
      id: 1,
      avatar: "",
      name: "PlayerPlayerPlayerPlayerPlayerPlayerPlayer 1",
      rating: 1111,
      symbol: "cross",
    },
    {
      id: 2,
      avatar: avatar,
      name: "Player 2",
      rating: 2222,
      symbol: "zero",
    },
    {
      id: 3,
      avatar: avatar,
      name: "Player 3",
      rating: 3333,
      symbol: "triangle",
    },
    {
      id: 4,
      avatar: avatar,
      name: "Player 4",
      rating: 4444,
      symbol: "square",
    },
  ];

  return (
    <div
      className={`${className} flex items-center shadow-md bg-white rounded-2xl w-full`}
    >
      <div className="flex items-center justify-center px-8 py-4 gap-10 w-full flex-wrap">
        {playersInfo.slice(0, playersCount).map((player) => {
          return (
            <div
              key={player.id}
              className="flex items-center justify-between gap-2"
            >
              <Player
                avatar={player.avatar}
                name={player.name}
                rating={player.rating}
                symbol={player.symbol}
              />
              <Divider className="h-6" />
              <GameTimer
                isTimerRunning={currentMove === player.symbol && !isWinner}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
