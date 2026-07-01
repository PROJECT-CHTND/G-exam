import { useEffect, useRef } from "react";

/**
 * Calls `cb` on a fixed interval while `running` is true.
 * Uses requestAnimationFrame timing so it pauses when the tab is hidden.
 */
export function useLoop(running: boolean, intervalMs: number, cb: () => void) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (now - last >= intervalMs) {
        last = now;
        cbRef.current();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, intervalMs]);
}
