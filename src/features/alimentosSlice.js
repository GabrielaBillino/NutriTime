import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    alimentos: [],
    selectedAlimento: '',
};

export const alimentosSlice = createSlice({
    name: "alimentos",
    initialState,
    reducers: {
        cargarAlimentos: (state, action) => {
            state.alimentos = action.payload;
        },
        cambiarOpcionSelecionada: (state, action) => {
            state.alimentos = action.payload;
        },
    }
})


export const { cargarAlimentos, cambiarOpcionSelecionada } = alimentosSlice.actions;

export default alimentosSlice.reducer;