import Divider from "@components/Divider";
import GameTimer from "@components/Game/Timer";
import { GameSymbolType } from "consts";
import PlayerInfo from "./Info";
import { Player } from "./PlayerInterface";
import { useGameStore } from "store/gameStore";
import { computePlayerTimer } from "utils/computePlayerTimer";

interface PlayerItemPropsInterface {
  player: Player;
  isWinner: boolean;
  onPlayerTimeOver: (symbol: GameSymbolType) => void;
}

export default function PlayerItem({
  player,
  isWinner,
  onPlayerTimeOver,
}: PlayerItemPropsInterface) {
  const timers = useGameStore((state) => state.timers);
  const currentMove = useGameStore((state) => state.currentMove);
  const currentMoveStart = useGameStore((state) => state.currentMoveStart);
  const { timer, timerStartAt } = computePlayerTimer(
    timers,
    currentMove,
    currentMoveStart,
    player.symbol
  );

  return (
    <div key={player.id} className="flex items-center justify-between gap-2">
      <PlayerInfo
        avatar={player.avatar}
        name={player.name}
        rating={player.rating}
        symbol={player.symbol}
      />
      <Divider className="h-6" />
      {timers && <GameTimer timer={timer} timerStartAt={timerStartAt} />}
    </div>
  );
}
