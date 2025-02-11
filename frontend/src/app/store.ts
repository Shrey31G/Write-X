import { configureStore } from "@reduxjs/toolkit";
import protectionReducer from "./features/protection/protectionSlice"

export const store = configureStore({
    reducer: {
        protection: protectionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch