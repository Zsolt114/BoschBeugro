import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";
import MachineReducer from "./machineNameSlice";
import componentShowReducer from "./componentButtonBackToDesboardShowSlice";
import tableShowSlice from "./tableShowSlice";

export const store = configureStore({
  reducer: {
    date: dateReducer,
    machine: MachineReducer,
    component: componentShowReducer,
    tableShowSlice: tableShowSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
