import { useRef, useEffect } from "react";
import type { ComponentProps } from "react";
import { useContext2D } from "../../hooks/useContext2D";
import { draw } from "../../utils/draw";
import styles from "./canvas.module.css";

type CanvasProps = ComponentProps<"canvas"> & {
  isPlaying: boolean;
  sides: number;
  noiseVal: number;
};

const scale = window.devicePixelRatio > 1 ? 2 : 1;
const displaySize = 600;
const size = displaySize * scale;

function Canvas({ isPlaying, sides, noiseVal }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useContext2D(canvasRef, displaySize, scale);
  const frameCount = useRef(0);

  useEffect(() => {
    let requestId: number | undefined = undefined;

    function animate() {
      if (!context) return;

      const time = frameCount.current * 0.005;
      draw(context, size, time, sides, noiseVal);

      if (isPlaying) {
        frameCount.current = frameCount.current + 1;
        requestId = requestAnimationFrame(animate);
      }
    }

    animate();

    return () => {
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, [context, isPlaying, sides, noiseVal]);

  return (
    <div className={styles["canvas-wrapper"]}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
