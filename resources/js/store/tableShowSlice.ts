import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tableShowSliceState {
  tableShowSlice: string | null;
}
const initialState: tableShowSliceState = {
  tableShowSlice: null
};
export const tableShowSlice = createSlice({
  name: 'tableShowSlice',
  initialState,
  reducers: {
     settableShowSlice: (state, action: PayloadAction<string | null>) => {
      state.tableShowSlice = action.payload;
    },
    
  }
});

export const { settableShowSlice} = tableShowSlice.actions;

export default tableShowSlice.reducer;