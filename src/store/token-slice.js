import { createSlice } from "@reduxjs/toolkit";


const initialTokenState = {idToken : localStorage.getItem("tokenId") || "" , userIsLoggedIn : !!localStorage.getItem("tokenId")} 

const tokenSlice = createSlice({
    name: "token",
    initialState : initialTokenState,
    reducers : {
        addtoken (state,action){
            state.idToken = action.payload;
            state.userIsLoggedIn = true ;
            localStorage.setItem("tokenId",action.payload)  
        },
        removetoken (state){
            state.idToken ="";
            state.userIsLoggedIn = false ;
            localStorage.removeItem ("tokenId")
        },
    }
})

export const tokenAction = tokenSlice.actions;

export default tokenSlice.reducer;