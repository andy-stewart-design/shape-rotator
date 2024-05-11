import { createNoise2D } from "simplex-noise";
import { map } from "./math";

const TWO_PI = Math.PI * 2;
const simplex = createNoise2D();

export function createCircle({ size = 200, resolution = 30 } = {}) {
  const numPoints = resolution * 4 + 4;

  const points = Array.from(Array(numPoints), (_, index) => {
    const step = index * (TWO_PI / numPoints);

    const x = Math.cos(step + Math.PI * 1.5) * size;
    const y = Math.sin(step + Math.PI * 1.5) * size;

    return [x, y];
  });

  return points;
}

export function createPolygon({ size = 200, sides = 3, resolution = 5 } = {}) {
  if (sides < 3) {
    throw new Error(
      "getPrimaryPoints expects a number greater than or equal to 3"
    );
  }

  const primaryPoints = Array.from(Array(sides), (_, index) => {
    const step = (TWO_PI / sides) * index;
    const x = Math.cos(step + Math.PI * 1.5) * size;
    const y = Math.sin(step + Math.PI * 1.5) * size;
    return [x, y];
  });

  const allPoints = primaryPoints
    .map((currentPoint, index) => {
      const numPoints = primaryPoints.length - 1;
      const nextPoint =
        index === numPoints ? primaryPoints[0] : primaryPoints[index + 1];

      const [startX, startY] = currentPoint;
      const [endX, endY] = nextPoint;

      const percentages = Array.from(Array(resolution + 1), (_, i) =>
        Number(((1 / (resolution + 1)) * i).toFixed(4))
      ).filter((p) => p !== 0);

      const midpoints = percentages.map((p) => {
        const midX = startX + (endX - startX) * p;
        const midY = startY + (endY - startY) * p;

        return [midX, midY];
      });

      return [currentPoint, ...midpoints];
    })
    .flat();

  return allPoints;
}

export function distortPoints(points: number[][], time = 0, temperature = 0.1) {
  const numPoints = points.length;
  const firstPoint = points[0];
  const size = firstPoint[1] * -1;

  return points.map((point, index) => {
    const step = index * (TWO_PI / numPoints);

    const [x, y] = point;
    const modX = x / size + time;
    const modY = y / size + time;
    const r = map(simplex(modX, modY), -1, 1, -temperature, temperature);
    const rX = Math.cos(step + Math.PI * 1.5) * size * r;
    const rY = Math.sin(step + Math.PI * 1.5) * size * r;

    return [x + rX, y + rY];
  });
}
