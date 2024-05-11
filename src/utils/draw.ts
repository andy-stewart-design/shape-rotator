import { createPolygon, distortPoints } from "./shapes";

export function draw(
  context: CanvasRenderingContext2D,
  canvasSize: number,
  time: number,
  sides: number,
  noiseVal: number
) {
  const shapeSize = canvasSize / 4;
  const rotation = Math.PI * time * 0.15;

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = "#0055FF";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  const points = createPolygon({ size: shapeSize, resolution: 30, sides });
  const noisePoints = distortPoints(points, time, noiseVal);

  context.fillStyle = "#FFFFFF";
  context.strokeStyle = "#FFFFFF";
  context.lineWidth = 3;

  context.save();
  context.translate(canvasSize / 2, canvasSize / 2);
  context.rotate(rotation);

  context.beginPath();

  noisePoints.forEach((point, index) => {
    const [x, y] = point;

    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });

  context.closePath();
  context.stroke();
  context.fill();
  context.restore();
}
