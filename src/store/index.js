import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import MessageReducer from "../feature/MessageSlice";

/**
 * @description Persitreducer configuration
 */

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, MessageReducer);

/**
 * @description store configuration
 */

export const store = configureStore({
  reducer: {
    message: persistedReducer,
  },
});

export const persistor = persistStore(store);
