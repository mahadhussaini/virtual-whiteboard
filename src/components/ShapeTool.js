import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCircle, faMinus } from "@fortawesome/free-solid-svg-icons";

const ShapeTool = ({ onShapeSelect }) => {
  return (
    <div className="shape-tools">
      <button onClick={() => onShapeSelect("rectangle")} title="Rectangle">
        <FontAwesomeIcon icon={faSquare} />
      </button>
      <button onClick={() => onShapeSelect("circle")} title="Circle">
        <FontAwesomeIcon icon={faCircle} />
      </button>
      <button onClick={() => onShapeSelect("line")} title="Line">
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  );
};

export default ShapeTool;
