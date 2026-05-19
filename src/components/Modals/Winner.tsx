import PlayerItem from "@components/Player/Item";
import { Player } from "@components/Player/PlayerInterface";
import Avatar from "@components/Avatar";
import Icon from "@components/Icon";
import UiButton from "@components/UiKit/UiButton";
import UiModal from "@components/UiKit/UiModal";
import { GameSymbolType } from "consts";
import { useGameStore } from "store/gameStore";
import clsx from "clsx";

interface ModalWinnerPropsInterface {
  winnerPlayer: Player | null;
  isDraw: boolean;
  winnerSequence: number[];
  players: Player[];
  onClose: () => void;
  playAgain: () => void;
}

export default function ModalWinner({
  onClose,
  winnerPlayer,
  isDraw,
  winnerSequence,
  players,
  playAgain,
}: ModalWinnerPropsInterface) {
  const finalTimers = useGameStore((state) => state.finalTimers);
  const cells = useGameStore((state) => state.cells);
  const fieldSize = useGameStore((state) => state.fieldSize);

  const cellSize = fieldSize <= 3 ? 60 : fieldSize <= 7 ? 36 : 20;

  return (
    <UiModal onClose={onClose} isOpen={!!winnerPlayer || isDraw}>
      <UiModal.Header>{isDraw ? "It's a draw!" : "The game is over"}</UiModal.Header>
      <UiModal.Body>
        {winnerPlayer && (
          <div className="flex flex-col items-center gap-2 py-4 mb-4 bg-teal-50 rounded-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-500">Winner</span>
            <div className="relative">
              <Avatar name={winnerPlayer.name} src={winnerPlayer.avatar} />
              <span className="absolute -top-2 -right-2 text-lg">🏆</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon iconName={winnerPlayer.symbol} width={18} height={18} />
              <span className="font-semibold text-slate-700 truncate max-w-[180px]">{winnerPlayer.name}</span>
            </div>
            <span className="text-xs text-slate-400">Rating: {winnerPlayer.rating}</span>
          </div>
        )}

        <div className="flex justify-center my-4">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${fieldSize}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${fieldSize}, ${cellSize}px)`,
            }}
          >
            {cells.map((cell, index) => {
              const isWinner = winnerSequence.includes(index);
              return (
                <div
                  key={index}
                  className={clsx(
                    "flex items-center justify-center border border-slate-200",
                    isWinner ? "bg-orange-600/10" : "bg-transparent"
                  )}
                >
                  {cell && (
                    <Icon
                      iconName={cell}
                      width={cellSize * 0.55}
                      height={cellSize * 0.55}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="justify-between grid grid-cols-2 gap-3">
          {players.map((player) => (
            <PlayerItem
              player={player}
              key={player.id}
              isWinner={player.id === winnerPlayer?.id}
              isGameOver={true}
              finalTimers={finalTimers as Partial<Record<GameSymbolType, number>> | null}
              onPlayerTimeOver={() => {}}
            />
          ))}
        </div>
      </UiModal.Body>
      <UiModal.Footer>
        <UiButton variant="outline" size="md" handleClick={onClose}>
          Back
        </UiButton>
        <UiButton handleClick={playAgain}>Play again</UiButton>
      </UiModal.Footer>
    </UiModal>
  );
}
