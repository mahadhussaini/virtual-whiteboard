import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrush,
  faSquare,
  faPaintRoller,
} from "@fortawesome/free-solid-svg-icons";

const BrushTool = ({ onBrushSelect }) => {
  return (
    <div className="brush-tools">
      <button onClick={() => onBrushSelect("round")} title="Round">
        <FontAwesomeIcon icon={faBrush} />
      </button>
      <button onClick={() => onBrushSelect("square")} title="Square">
        <FontAwesomeIcon icon={faSquare} />
      </button>
      <button onClick={() => onBrushSelect("texture")} title="Texture">
        <FontAwesomeIcon icon={faPaintRoller} />
      </button>
    </div>
  );
};

export default BrushTool;
