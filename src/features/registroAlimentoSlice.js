import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registro: [],
}

export const registroAlimentoSlice = createSlice({
    name: "registro",
    initialState,
    reducers: {       
        agregarRegistro: (state, action) => {
            state.registro.push(action.payload)
        }
    }
});


export const { agregarRegistro } = registroAlimentoSlice.actions;

export default registroAlimentoSlice.reducer;