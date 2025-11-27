import Icon from "@components/Icon";
import Link from "next/link";

interface GameTitlePropsInterface {
  playersCount: number;
}

export default function GameTitle({ playersCount }: GameTitlePropsInterface) {
  return (
    <div className="">
      <Link
        href="/"
        className="flex gap-3 items-center text-teal-600 transition-colors hover:text-teal-500"
      >
        <Icon iconName="left-arrow" />

        <span>Back home</span>
      </Link>

      <h1 className="text-4xl">Tic Tac Toe</h1>

      <div className="flex gap-3 text-xs text-slate-400 items-center">
        <Icon iconName="star" />
        <div className="flex items-center gap-1">
          <Icon iconName="player" />

          <span>{playersCount}</span>
        </div>

        <div className="flex items-center gap-1">
          <Icon iconName="time" />

          <span>1 min per move</span>
        </div>
      </div>
    </div>
  );
}
