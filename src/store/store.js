import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./slices/GlobalSlice";

export const store = configureStore({
    reducer: {
        GlobalReducer: GlobalReducer
    }
})