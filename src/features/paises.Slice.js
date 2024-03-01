import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pais: [],
}

export const paisSlice = createSlice({
    name: "pais",
    initialState,
    reducers: {
        cargarPais: (state, action) => {
            state.pais = action.payload;
        },
        cargarUsuarioPais: (state, action) => {
            state.pais = action.payload;
        },
    }
});


export const { cargarPais, cargarUsuarioPais } = paisSlice.actions;

export default paisSlice.reducer;