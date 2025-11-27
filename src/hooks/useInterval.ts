import { useEffect } from "react";

export default function useInterval(
  interval = 1000,
  enabled: boolean,
  cb: (date: number) => void
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const int = setInterval(() => {
      cb(Date.now());
    }, interval);

    return () => {
      clearInterval(int);
    };
  }, [interval, enabled]);
}
