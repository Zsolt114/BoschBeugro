import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MachineState {
  selectedMachine: string | null;
}
const initialState: MachineState = {
  selectedMachine: "ALL"
};
export const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
     setSelectedMachine: (state, action: PayloadAction<string | null>) => {
      state.selectedMachine = action.payload;
    },
    
  }
});

export const { setSelectedMachine } = machineSlice.actions;

export default machineSlice.reducer;
