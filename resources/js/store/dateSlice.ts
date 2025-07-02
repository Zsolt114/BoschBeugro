import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  startDate: Date | null;
  endDate: Date | null;
}

const initialState: DateState = {
  startDate: null,
  endDate: null,
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<Date | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date | null>) => {
      state.endDate = action.payload;
    },
    setRange: (state, action: PayloadAction<[Date | null, Date | null]>) => {
      state.startDate = action.payload[0];
      state.endDate = action.payload[1];
    },
  },
});

export const { setStartDate, setEndDate, setRange } = dateSlice.actions;

export default dateSlice.reducer;
