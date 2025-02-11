
import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    value: boolean
}

const initialState: CounterState = {
    value: false
}

export const protectionSlice = createSlice({
    name: 'protction',
    initialState,
    reducers: {
        changeProtection: (state) => {
            state.value = (!state.value)
        }
    }
})

export const {changeProtection} = protectionSlice.actions

export default protectionSlice.reducer