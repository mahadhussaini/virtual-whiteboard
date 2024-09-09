import React from "react";
import ColorPicker from "./ColorPicker";
import SizePicker from "./SizePicker";

const Toolbar = ({ setColor, setSize }) => {
  return (
    <div className="toolbar">
      <ColorPicker setColor={setColor} />
      <SizePicker setSize={setSize} />
    </div>
  );
};

export default Toolbar;
