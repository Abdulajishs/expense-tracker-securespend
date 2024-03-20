import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token"
import expenseReducer from "./expense"
import themeReducer from "./theme"

const store  = configureStore(
    {reducer : {token : tokenReducer , expenses : expenseReducer , theme : themeReducer}}
)

export default store;