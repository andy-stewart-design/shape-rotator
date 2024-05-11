import { useEffect, useState } from "react";
import type { RefObject } from "react";

const deviceResolution = window.devicePixelRatio;
const targetResolution = deviceResolution > 1 ? 2 : 1;

export function useContext2D(
  elRef: RefObject<HTMLCanvasElement>,
  size = 400,
  scale = targetResolution
) {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!elRef.current) return;

    const canvas = elRef.current;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    canvas.width = size * scale;
    canvas.height = size * scale;

    const ctx = canvas.getContext("2d");
    setContext(ctx);
  }, []);

  return context;
}
