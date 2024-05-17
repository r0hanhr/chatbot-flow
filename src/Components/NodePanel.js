import React from "react";

const NodePanel = () => {
  /**
   * @description Function for handling the node drag
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <div
        className="node-panel d-flex flex-column align-items-center justify-content-center m-3 p-3"
        onDragStart={event => onDragStart(event, "default")}
        draggable
      >
        <i className="bi bi-chat-dots"></i>
        <p className="mb-0">Message</p>
      </div>
    </>
  );
};

export default NodePanel;
