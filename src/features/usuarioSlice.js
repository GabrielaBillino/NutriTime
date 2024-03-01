import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuarioLogeado: null,
}

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        logearUsuario: (state, action) => {
            state.usuarioLogeado = action.payload;
        },
        logoutUsuario:(state) => {
            state.usuarioLogeado = null;
        }
    }
});


export const { logearUsuario, logoutUsuario } = usuarioSlice.actions;

export default usuarioSlice.reducer;