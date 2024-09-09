import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faUndo,
  faRedo,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const Canvas = ({ color, size, shape, text, brush, zoom }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawHistory, setDrawHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(0);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    canvas.width = window.innerWidth * 2;
    // @ts-ignore
    canvas.height = window.innerHeight * 2;
    // @ts-ignore
    canvas.style.width = `${window.innerWidth}px`;
    // @ts-ignore
    canvas.style.height = `${window.innerHeight}px`;

    // @ts-ignore
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = size;
    contextRef.current = context;

    const savedCanvas = localStorage.getItem("canvasDrawing");
    if (savedCanvas) {
      const img = new Image();
      img.src = savedCanvas;
      img.onload = () => {
        context.drawImage(img, 0, 0);
        // @ts-ignore
        setDrawHistory([savedCanvas]);
        setHistoryStep(1);
      };
    } else {
      // @ts-ignore
      const initialCanvas = canvas.toDataURL();
      // @ts-ignore
      setDrawHistory([initialCanvas]);
      setHistoryStep(1);
    }
  }, [color, size, shape, text, brush, zoom]);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (event.touches) {
      const touch = event.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      x = event.offsetX;
      y = event.offsetY;
    }
    return { x, y };
  };

  const startDrawing = (event) => {
    const { x, y } = getCoordinates(event);
    // @ts-ignore
    contextRef.current.beginPath();
    // @ts-ignore
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!isDrawing) return;
    // @ts-ignore
    contextRef.current.closePath();
    setIsDrawing(false);

    // @ts-ignore
    const canvasImage = canvasRef.current.toDataURL();
    const updatedHistory = [...drawHistory.slice(0, historyStep), canvasImage];
    // @ts-ignore
    setDrawHistory(updatedHistory);
    setHistoryStep(updatedHistory.length);
    localStorage.setItem("canvasDrawing", canvasImage);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(event);
    if (isEraser) {
      // @ts-ignore
      contextRef.current.globalCompositeOperation = "destination-out";
      // @ts-ignore
      contextRef.current.arc(x, y, size, 0, Math.PI * 2);
      // @ts-ignore
      contextRef.current.fill();
      // @ts-ignore
      contextRef.current.globalCompositeOperation = "source-over";
    } else {
      // @ts-ignore
      contextRef.current.lineTo(x, y);
      // @ts-ignore
      contextRef.current.stroke();
    }
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    startDrawing(e);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    draw(e);
  };

  const handleTouchEnd = () => {
    finishDrawing();
  };

  const undo = () => {
    if (historyStep > 1) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      loadCanvas(drawHistory[newStep - 1]);
    }
  };

  const redo = () => {
    if (historyStep < drawHistory.length) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      loadCanvas(drawHistory[newStep - 1]);
    }
  };

  const loadCanvas = (dataURL) => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      // @ts-ignore
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
  };

  const clearCanvas = () => {
    // @ts-ignore
    contextRef.current.clearRect(
      0,
      0,
      // @ts-ignore
      canvasRef.current.width,
      // @ts-ignore
      canvasRef.current.height
    );
    // @ts-ignore
    const canvasImage = canvasRef.current.toDataURL();
    // @ts-ignore
    setDrawHistory((prev) => [...prev.slice(0, historyStep), canvasImage]);
    setHistoryStep((prev) => prev + 1);
    localStorage.removeItem("canvasDrawing");
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "whiteboard.png";
    link.click();
  };

  const applyZoom = () => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const context = canvas.getContext("2d");
    context.save();
    context.scale(zoom, zoom);
    context.restore();
  };

  useEffect(() => {
    applyZoom();
  }, [zoom]);

  const drawShape = (x, y) => {
    const context = contextRef.current;
    // @ts-ignore
    context.beginPath();
    switch (shape) {
      case "circle":
        // @ts-ignore
        context.arc(x, y, size / 2, 0, Math.PI * 2);
        // @ts-ignore
        context.stroke();
        break;
      case "rectangle":
        // @ts-ignore
        context.rect(x - size / 2, y - size / 2, size, size);
        // @ts-ignore
        context.stroke();
        break;
      case "line":
        // @ts-ignore
        context.moveTo(x - size / 2, y - size / 2);
        // @ts-ignore
        context.lineTo(x + size / 2, y + size / 2);
        // @ts-ignore
        context.stroke();
        break;
      default:
        break;
    }
    // @ts-ignore
    context.closePath();
  };

  const drawText = (x, y) => {
    const context = contextRef.current;
    // @ts-ignore
    context.font = `${size}px Arial`;
    // @ts-ignore
    context.fillStyle = color;
    // @ts-ignore
    context.fillText(text, x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const context = contextRef.current;

    const handleDraw = (event) => {
      if (isDrawing) {
        if (shape) {
          const { x, y } = getCoordinates(event);
          drawShape(x, y);
        } else if (text) {
          const { x, y } = getCoordinates(event);
          drawText(x, y);
        } else {
          draw(event);
        }
      }
    };

    // @ts-ignore
    canvas.addEventListener("mousemove", handleDraw);
    // @ts-ignore
    canvas.addEventListener("mouseup", finishDrawing);
    // @ts-ignore
    canvas.addEventListener("mousedown", startDrawing);

    return () => {
      // @ts-ignore
      canvas.removeEventListener("mousemove", handleDraw);
      // @ts-ignore
      canvas.removeEventListener("mouseup", finishDrawing);
      // @ts-ignore
      canvas.removeEventListener("mousedown", startDrawing);
    };
  }, [isDrawing, shape, text, isEraser]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none" }}
      />
      <div className="actions">
        <button onClick={() => setIsEraser(!isEraser)}>
          <FontAwesomeIcon icon={faEraser} style={{ marginRight: "8px" }} />
          {isEraser ? " Switch to Pen" : " Eraser"}
        </button>
        <button onClick={undo}>
          <FontAwesomeIcon icon={faUndo} style={{ marginRight: "8px" }} />
          Undo
        </button>
        <button onClick={redo}>
          <FontAwesomeIcon icon={faRedo} style={{ marginRight: "8px" }} />
          Redo
        </button>
        <button onClick={clearCanvas}>
          <FontAwesomeIcon icon={faTrash} style={{ marginRight: "8px" }} />
          Clear
        </button>
        <button onClick={saveCanvas}>
          <FontAwesomeIcon icon={faSave} style={{ marginRight: "8px" }} />
          Save
        </button>
      </div>
    </div>
  );
};

export default Canvas;
