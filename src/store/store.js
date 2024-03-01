import { configureStore } from "@reduxjs/toolkit";
import alimentoReducer from "../features/alimentosSlice";
import usuarioReducer from "../features/usuarioSlice";
import spinnerReducer from "../features/spinnerSlice";
import registrosReducer from "../features/registrosSlice";
import registroAlimentoReducer from "../features/registroAlimentoSlice";
import paisReducer from "../features/paises.Slice";

export const store = configureStore({
    reducer: {
        alimentos: alimentoReducer,
        usuario: usuarioReducer,
        spinner: spinnerReducer,
        registros: registrosReducer,
        registro: registroAlimentoReducer,
        pais: paisReducer,
    }
})