"use client";
import Icon from "@components/Icon";
import { GameSymbolsEnum } from "enums";
import clsx from "clsx";

interface GameCellPropsInterface {
  isWinner: boolean;
  onClick: () => void;
  symbol: GameSymbolsEnum | null;
}

export default function GameCell({
  isWinner,
  symbol,
  onClick,
}: GameCellPropsInterface) {
  // console.log({ isWinner });

  return (
    <button
      className={clsx(
        isWinner ? "bg-orange-600/10" : "bg-transparent",
        "flex border border-slate-200 items-center justify-center"
      )}
      onClick={onClick}
    >
      {symbol && <Icon iconName={symbol} height={20} width={20} />}
    </button>
  );
}
