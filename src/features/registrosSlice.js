import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    registros: []
};

export const registrosSlice = createSlice({
    name: "registros",
    initialState,
    reducers: {
        cargarRegistros: (state, action) => {
            state.registros = action.payload;
        },
        eliminarRegistro: (state, action) => {
            const indiceAEliminar = state.registros.findIndex(
                (registro) => registro.id === action.payload
            );

            state.registros.splice(indiceAEliminar, 1);

        },
        agregarRegistros: (state, action) => {
            state.registros.push(action.payload)

        },
    }
})


export const { cargarRegistros, eliminarRegistro, agregarRegistros } = registrosSlice.actions;
export default registrosSlice.reducer;