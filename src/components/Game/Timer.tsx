import clsx from "clsx";
import useNow from "hooks/useNow";

interface GameTimerPropsInterface {
  timer: number;
  timerStartAt: number;
  isGameOver?: boolean;
}

export default function GameTimer({
  timer,
  timerStartAt,
  isGameOver = false,
}: GameTimerPropsInterface) {
  const now = useNow(1000, !!timerStartAt && !isGameOver, timerStartAt);
  const mils = Math.max(now ? timer - (now - timerStartAt) : timer, 0);
  const seconds = Math.ceil(mils / 1000);
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(seconds % 60).padStart(2, "0");

  const isLastSeconds = seconds <= 10;

  return (
    <div
      className={clsx(
        isLastSeconds && "text-orange-600",
        !timerStartAt && "text-slate-300",
        "text-lg font-semibold w-14"
      )}
    >
      {minutesString}:{secondsString}
    </div>
  );
}
