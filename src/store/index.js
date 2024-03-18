import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token"
import expenseReducer from "./expense"

const store  = configureStore(
    {reducer : {token : tokenReducer , expenses : expenseReducer}}
)

export default store;