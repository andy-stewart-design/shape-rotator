// import { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import Slider from "./components/Slider/Slider";
import { useSlider } from "./hooks/use-inputs";
import classes from "./app.module.css";

function App() {
  // const [isPlaying, setIsPlaying] = useState(true);
  // const [sides, setSides] = useState(4);
  const [noiseVal, noiseProps] = useSlider(0.15, 0, 0.5, 0.01);

  return (
    <div className={classes.container}>
      <Canvas isPlaying={true} sides={4} noiseVal={noiseVal} />
      <Slider label="Noise" value={noiseVal} {...noiseProps} />

      {/* <input
        type="range"
        value={sides}
        onChange={(e) => setSides(+e.target.value)}
        min={3}
        max={8}
        step={1}
      /> */}
    </div>
  );
}

export default App;
