import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTextWidth } from "@fortawesome/free-solid-svg-icons";

const TextTool = ({ onAddText }) => {
  const [text, setText] = useState("");

  const handleAddText = () => {
    if (text.trim()) {
      onAddText(text);
      setText("");
    }
  };

  return (
    <div className="text-tool">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button
        onClick={handleAddText}
        title="Add Text"
        style={{ marginLeft: "10px" }}
      >
        <FontAwesomeIcon icon={faTextWidth} />
      </button>
    </div>
  );
};

export default TextTool;
