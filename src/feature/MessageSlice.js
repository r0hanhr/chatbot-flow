import { createSlice } from "@reduxjs/toolkit";

/**
 * @description Initial store
 */
const initialState = {
  nodes: [],
  edges: [],
};

/**
 * @description slice creation
 */
const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    saveMessage: (state, action) => {
      return {
        ...state,
        nodes: [...action.payload.nodes],
        edges: [...action.payload.edges],
      };
    },
  },
});

export const { saveMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
