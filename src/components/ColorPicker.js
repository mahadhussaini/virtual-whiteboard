import React from "react";

const ColorPicker = ({ setColor }) => {
  const colors = [
    "black",
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "cyan",
    "magenta",
    "lime",
    "teal",
    "navy",
    "maroon",
    "gold",
    "silver",
    "gray",
    "violet",
    "indigo",
  ];

  return (
    <div className="color-picker">
      {colors.map((color) => (
        <button
          key={color}
          style={{ backgroundColor: color }}
          onClick={() => setColor(color)}
          className="color-button"
        />
      ))}
    </div>
  );
};

export default ColorPicker;
