import PlayerList from "@components/Player/List";
import { Player } from "@components/Player/PlayerInterface";
import { GameSymbolType } from "consts";

interface GameInfoPropsInterface {
  className?: string;
  playersCount: number;
  players: Player[];
  isWinner: boolean;
  onPlayerTimeOver: (symbol: GameSymbolType) => void;
}

export default function GameInfo({
  className = "",
  players,
  isWinner,
  onPlayerTimeOver,
}: GameInfoPropsInterface) {
  return (
    <div
      className={`${className} flex items-center shadow-md bg-white rounded-2xl w-full`}
    >
      <PlayerList
        players={players}
        isWinner={isWinner}
        onPlayerTimeOver={onPlayerTimeOver}
      />
    </div>
  );
}
