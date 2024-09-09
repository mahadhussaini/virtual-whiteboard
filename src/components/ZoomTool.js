import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faSearchMinus } from "@fortawesome/free-solid-svg-icons";

const ZoomTool = ({ onZoom }) => {
  return (
    <div className="zoom-tool">
      <button onClick={() => onZoom("in")} title="Zoom In">
        <FontAwesomeIcon icon={faSearchPlus} />
      </button>
      <button onClick={() => onZoom("out")} title="Zoom Out">
        <FontAwesomeIcon icon={faSearchMinus} />
      </button>
    </div>
  );
};

export default ZoomTool;
