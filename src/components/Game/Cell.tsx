"use client";
import Icon from "@components/Icon";
import { GameSymbolType } from "consts";
import clsx from "clsx";
import { memo } from "react";

interface GameCellPropsInterface {
  isWinner: boolean;
  disabled: boolean;
  index: number;
  onClick: (index: number) => void;
  symbol: GameSymbolType | null;
}

export const GameCell = memo(function GameCell({
  isWinner,
  symbol,
  onClick,
  disabled,
  index,
}: GameCellPropsInterface) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        isWinner ? "bg-orange-600/10" : "bg-transparent",
        "flex border border-slate-200 items-center justify-center"
      )}
      onClick={() => onClick(index)}
    >
      {symbol && <Icon iconName={symbol} height={20} width={20} />}
    </button>
  );
});
