import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import ShapeTool from "./components/ShapeTool";
import TextTool from "./components/TextTool";
import BrushTool from "./components/BrushTool";
import ZoomTool from "./components/ZoomTool";
import "./App.css";

function App() {
  const [color, setColor] = useState("black");
  const [size, setSize] = useState(5);
  const [shape, setShape] = useState(null);
  const [text, setText] = useState("");
  const [brush, setBrush] = useState("round");
  const [zoom, setZoom] = useState(1);

  return (
    <div className="App">
      <h1>CanvasMaster</h1>
      <Toolbar setColor={setColor} setSize={setSize} />
      <div className="tools">
        <ShapeTool onShapeSelect={setShape} />
        <TextTool onAddText={setText} />
        <BrushTool onBrushSelect={setBrush} />
        <ZoomTool
          onZoom={(direction) =>
            setZoom((prev) => (direction === "in" ? prev * 1.2 : prev / 1.2))
          }
        />
      </div>
      <Canvas
        color={color}
        size={size}
        shape={shape}
        text={text}
        brush={brush}
        zoom={zoom}
      />
    </div>
  );
}

export default App;
