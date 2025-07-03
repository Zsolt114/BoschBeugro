import { createSlice } from '@reduxjs/toolkit';
const componentShowSlice = createSlice({
    name: 'componentShow',
    initialState: {
        showComponent: true,
    },
    reducers: {
        toggleComponent: (state) => {
            state.showComponent = !state.showComponent;
        },
        setShowComponent: (state, action) => {
            state.showComponent = action.payload;
        },
    },
});
export const { toggleComponent, setShowComponent } = componentShowSlice.actions;
export default componentShowSlice.reducer;