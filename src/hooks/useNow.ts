import { useEffect, useState } from "react";

export default function useNow(interval = 1000, enabled: boolean, resetKey?: unknown) {
  const [now, setNow] = useState<number | undefined>();

  useEffect(() => {
    setNow(undefined);

    if (!enabled) {
      return;
    }

    const int = setInterval(() => {
      setNow(Date.now());
    }, interval);

    return () => {
      clearInterval(int);
    };
  }, [interval, enabled, resetKey]);

  return now;
}
