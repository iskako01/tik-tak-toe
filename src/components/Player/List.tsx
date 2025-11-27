import PlayerItem from "@components/Player/Item";
import { GameSymbolType } from "consts";
import { Player } from "./PlayerInterface";

interface PlayerListPropsInterface {
  className?: string;
  players: Player[];
  isWinner: boolean;
  onPlayerTimeOver: (symbol: GameSymbolType) => void;
}

export default function PlayerList({
  className,
  players,
  isWinner,
  onPlayerTimeOver,
}: PlayerListPropsInterface) {


  return (
    <div
      className={`${className} flex items-center shadow-md bg-white rounded-2xl w-full`}
    >
      <div className="flex items-center justify-center px-8 py-4 gap-10 w-full flex-wrap">
        {players.map((player) => {
          return (
            <PlayerItem
              key={player.id}
              player={player}
              isWinner={isWinner}
              onPlayerTimeOver={onPlayerTimeOver}
            />
          );
        })}
      </div>
    </div>
  );
}
