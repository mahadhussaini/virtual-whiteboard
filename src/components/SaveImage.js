import React from "react";

const SaveImage = ({ canvasRef }) => {
  const saveImage = () => {
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvasRef.toDataURL("image/png");
    link.click();
  };

  return <button onClick={saveImage}>Save</button>;
};

export default SaveImage;
