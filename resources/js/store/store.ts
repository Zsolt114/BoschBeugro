import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";
import MachineReducer from "./machineSlice";

export const store = configureStore({
  reducer: {
    date: dateReducer,
    machine: MachineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
