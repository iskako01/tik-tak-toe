import PlayerItem from "@components/Player/Item";
import { Player } from "@components/Player/PlayerInterface";
import Profile from "@components/Profile";
import UiButton from "@components/UiKit/UiButton";
import UiModal from "@components/UiKit/UiModal";

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
  return (
    <UiModal onClose={onClose} isOpen={!!winnerName}>
      <UiModal.Header>The game is over</UiModal.Header>
      <UiModal.Body>
        {winnerName && <div>Winner is: {winnerName} </div>}
        <div className="justify-between grid grid-cols-2 gap-3">
          {players.map((player) => {
            return (
              // <Profile
              //   avatar={player.avatar}
              //   name={player.name}
              //   key={player.id}
              //   rating={player.rating}
              //   symbol={player.symbol}
              // />
              <PlayerItem
                player={player}
                key={player.id}
                isWinner={!!winnerName}
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
