import clsx from "clsx";
import { useGameState } from "hooks/useGameState";
import { useEffect, useRef, useState } from "react";

interface GameTimerPropsInterface {
  isTimerRunning: boolean;
}

export default function GameTimer({ isTimerRunning }: GameTimerPropsInterface) {
  const [seconds, setSeconds] = useState(5);

  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(seconds % 60).padStart(2, "0");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isLastSeconds = seconds <= 10;

  const { setCurrentMove } = useGameState(4);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (!prev) {
            setCurrentMove();
            clearInterval(intervalRef.current!);
            return prev;
          }

          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(intervalRef.current!);
        setCurrentMove();
        setSeconds(60);
      };
    }
  }, [isTimerRunning]);

  return (
    <div
      className={clsx(
        isLastSeconds && "text-orange-600",
        !isTimerRunning && "text-slate-300",
        "text-lg font-semibold w-14"
      )}
    >
      {minutesString}:{secondsString}
    </div>
  );
}
