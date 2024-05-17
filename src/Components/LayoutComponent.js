import React, { useEffect, useRef, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import MessagePanel from "./MessagePanel";
import { ReactFlowProvider, useEdgesState, useNodesState } from "reactflow";
import NodePanel from "./NodePanel";
import SettingsPanel from "./SettingsPanel";
import { useSelector } from "react-redux";

const LayoutComponent = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const message = useSelector(state => state.message);

  /**
   * @description Setting initial value for nodes and edges from redux store
   */
  useEffect(() => {
    setNodes(JSON.parse(JSON.stringify(message?.nodes)) || []);
    setEdges(JSON.parse(JSON.stringify(message?.edges)) || []);
  }, [message]);

  return (
    <>
      <HeaderComponent nodes={nodes} edges={edges} />
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <div className="main-container row g-0">
              <div className="col-8">
                <MessagePanel
                  reactFlowWrapper={reactFlowWrapper}
                  nodes={nodes}
                  edges={edges}
                  setNodes={setNodes}
                  onNodesChange={onNodesChange}
                  setSelectedNode={setSelectedNode}
                  setEdges={setEdges}
                  onEdgesChange={onEdgesChange}
                />
              </div>
              <div className="col-4 border-start">
                {selectedNode ? (
                  <SettingsPanel
                    selectedNode={selectedNode}
                    nodes={nodes}
                    setNodes={setNodes}
                    setSelectedNode={setSelectedNode}
                  />
                ) : (
                  <NodePanel />
                )}
              </div>
            </div>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default LayoutComponent;
