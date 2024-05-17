import React, { useCallback, useState } from "react";
import ReactFlow, { Controls, addEdge } from "reactflow";

let id = 0;
const getId = () => `dndnode_${id++}`;

const MessagePanel = ({
  nodes = [],
  edges = [],
  setNodes = () => {},
  onNodesChange = () => {},
  setSelectedNode = () => {},
  onEdgesChange = () => {},
  setEdges = () => {},
}) => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  /**
   * @description Function for handling the edge connection
   */
  const onConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    []
  );

  /**
   * @description Function for handling the node drop
   */
  const onDrop = useCallback(
    event => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      /**
       * @description check if the dropped element is valid
       */
      if (typeof type === "undefined" || !type) {
        return;
      }

      /**
       * @description Setting the postion for new node
       */
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      /**
       * @description Creating new node
       */
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `Test message ${id}` },
        sourcePosition: "right",
        targetPosition: "left",
        style: {
          border: "1px solid #ccc",
          fontSize: 8,
          width: "100px",
          height: "20px",
          padding: 3,
          textAlign: "left",
        },
      };

      setNodes(nds => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  /**
   * @description Funcgtion for handling the node drag
   */
  const onDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * @description Function for handling the node click
   */
  const onNodeClick = node => {
    setSelectedNode(node);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
      fitView
      onNodeClick={(_, node) => onNodeClick(node)}
    >
      <Controls />
    </ReactFlow>
  );
};

export default MessagePanel;
