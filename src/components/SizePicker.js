import React from "react";

const SizePicker = ({ setSize }) => {
  const sizes = [1, 2, 4, 6, 8, 10, 12, 15, 20, 25, 30, 40];

  return (
    <div className="size-picker">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => setSize(size)}
          className="size-button"
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizePicker;
