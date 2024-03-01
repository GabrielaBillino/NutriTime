import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
}

export const spinnerSlice = createSlice({
    name: "spinner",
    initialState,
    reducers: {
        spinnerCargando: (state, action) => {
            state.loading = action.payload;
        }
    }
});


export const { spinnerCargando } = spinnerSlice.actions;

export default spinnerSlice.reducer;