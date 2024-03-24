import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token-slice"
import expenseReducer from "./expense-slice"
import themeReducer from "./theme-slice"

const store  = configureStore(
    {reducer : {token : tokenReducer , expenses : expenseReducer , theme : themeReducer}}
)

export default store;