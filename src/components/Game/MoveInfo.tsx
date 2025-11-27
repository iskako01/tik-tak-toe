import Icon from "@components/Icon";
import UiButton from "@components/UiKit/UiButton";
import { GameSymbolsEnum } from "enums";

interface GameMoveInfoPropsInterface {
  currentMove: GameSymbolsEnum;
  nextMove: GameSymbolsEnum;
}

export default function GameMoveInfo({
  currentMove,
  nextMove,
}: GameMoveInfoPropsInterface) {
  return (
    <div className="flex justify-between items-center mb-3">
      <div>
        <span className="flex text-xl font-semibold gap-1 items-start">
          Current move:
          <Icon iconName={currentMove} height={20} width={20} />
        </span>
        <span className="flex text-slate-400 text-xs gap-1 items-start">
          Next move: <Icon iconName={nextMove} />
        </span>
      </div>

      <div className="flex gap-3">
        <UiButton>Draw</UiButton>
        <UiButton variant="outline">Surrender</UiButton>
      </div>
    </div>
  );
}
