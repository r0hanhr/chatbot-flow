import React from "react";

const SettingsPanel = ({
  selectedNode = {},
  setSelectedNode = () => {},
  setNodes = () => {},
}) => {
  /**
   * @description Handling the back button
   */
  const handleBackClick = () => {
    setSelectedNode(null);
  };

  /**
   * @description Handling the on change functionality of textarea
   */
  const handleOnChange = e => {
    const value = e.target.value;

    /**
     * @description Updating the node label for master data
     */
    setNodes(nds =>
      nds.map(node => {
        if (node.id === selectedNode.id) {
          node.data = {
            ...node.data,
            label: value,
          };
        }

        return node;
      })
    );

    /**
     * @description Updating the node label for selected data
     */
    const tempNode = { ...selectedNode };
    tempNode.data.label = value;
    setSelectedNode({ ...tempNode });
  };

  return (
    <div>
      <div className="d-flex align-items-center p-2 border-bottom">
        <i className="bi bi-arrow-left" onClick={handleBackClick}></i>
        <p className="mb-0 text-center w-100">Message</p>
      </div>
      <div className="p-2">
        <label htmlFor="message" className="form-label">
          Text
        </label>
        <textarea
          id="message"
          className="form-control"
          value={selectedNode?.data?.label || ""}
          onChange={e => handleOnChange(e)}
        ></textarea>
      </div>
    </div>
  );
};

export default SettingsPanel;
