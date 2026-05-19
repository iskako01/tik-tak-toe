import Icon from "@components/Icon";
import UiButton from "@components/UiKit/UiButton";
import { GameSymbolType } from "consts";

interface GameMoveInfoPropsInterface {
  currentMove: GameSymbolType;
  nextMove: GameSymbolType;
  onDraw: () => void;
  onSurrender: () => void;
}

export default function GameMoveInfo({
  currentMove,
  nextMove,
  onDraw,
  onSurrender,
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
        <UiButton handleClick={onDraw}>Draw</UiButton>
        <UiButton variant="outline" handleClick={onSurrender}>Surrender</UiButton>
      </div>
    </div>
  );
}
