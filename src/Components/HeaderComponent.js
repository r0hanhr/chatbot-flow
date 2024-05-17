import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { saveMessage } from "../feature/MessageSlice";

const HeaderComponent = ({ nodes = [], edges = [] }) => {
  const dispatch = useDispatch();

  /**
   * @description Handle the save changes button function
   */
  const handleSaveChnages = () => {
    let flag = false;
    let errorMessage = "";

    /**
     * @description Validation for message
     */
    if (!nodes.length) {
      flag = true;
      errorMessage = "Cannot save flow, Message is empty.";
    }

    /**
     * @description Validation for Node has empty target handles
     */
    if (
      (nodes.length && nodes.length - 1 !== edges.length) ||
      (nodes.length && edges.length === 0)
    ) {
      flag = true;
      errorMessage = "Cannot save flow, Node has empty target handles.";
    }

    /**
     * @description Validation for Can only have one edge originating from a source handle
     */
    const valueArr = edges.map(function (item) {
      return item.source;
    });
    const isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) !== idx;
    });

    if (isDuplicate) {
      flag = true;
      errorMessage =
        "Cannot save flow, Can only have one edge originating from a source handle.";
    }

    if (flag) {
      toast.error(errorMessage);
    } else {
      /**
       * @description Storing nodes and edges in redux store
       */
      dispatch(saveMessage({ nodes, edges }));
      toast.success("Flow saved.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid justify-content-end align-items-center">
        <button className="save-btn px-4 py-2" onClick={handleSaveChnages}>
          Save Changes
        </button>
      </div>
    </nav>
  );
};

export default HeaderComponent;
