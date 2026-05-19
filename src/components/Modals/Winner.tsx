import PlayerItem from "@components/Player/Item";
import { Player } from "@components/Player/PlayerInterface";
import UiButton from "@components/UiKit/UiButton";
import UiModal from "@components/UiKit/UiModal";
import { GameSymbolType } from "consts";
import { useGameStore } from "store/gameStore";

interface ModalWinnerPropsInterface {
  winnerName: string;
  players: Player[];
  onClose: () => void;
  playAgain: () => void;
}

export default function ModalWinner({
  onClose,
  winnerName,
  players,
  playAgain,
}: ModalWinnerPropsInterface) {
  const finalTimers = useGameStore((state) => state.finalTimers);

  return (
    <UiModal onClose={onClose} isOpen={!!winnerName}>
      <UiModal.Header>The game is over</UiModal.Header>
      <UiModal.Body>
        {winnerName && <div>Winner is: {winnerName} </div>}
        <div className="justify-between grid grid-cols-2 gap-3">
          {players.map((player) => {
            return (
              <PlayerItem
                player={player}
                key={player.id}
                isWinner={!!winnerName}
                isGameOver={true}
                finalTimers={finalTimers as Partial<Record<GameSymbolType, number>> | null}
                onPlayerTimeOver={() => {}}
              />
            );
          })}
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
