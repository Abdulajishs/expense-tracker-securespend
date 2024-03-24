import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name : "theme",
    initialState : {
        mode : false
    },
    reducers : {
        switchTheme(state){
            state.mode = !state.mode;
        }
    }
})

export const themeAction = themeSlice.actions

export default themeSlice.reducer;