import { useEffect, useState } from "react";

export default function useNow(interval = 1000, enabled: boolean) {
  const [now, setNow] = useState<number | undefined>();

  useEffect(() => {
    if (!enabled) {
      setNow(undefined);

      return;
    }

    const int = setInterval(() => {
      setNow(Date.now());
    }, interval);

    return () => {
      clearInterval(int);
    };
  }, [interval, enabled]);

  return now;
}
