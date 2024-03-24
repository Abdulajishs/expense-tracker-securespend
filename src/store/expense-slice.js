import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenses: [],
    itemToEdit: null,
}


const expensesSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        replaceExpense(state, action) {
            // console.log(action.payload);
            state.expenses = action.payload;
        },
        setItemToEdit(state, action) {
            state.itemToEdit = action.payload;
        },
        saveExpense(state, action) {
            const newExpense = action.payload
            let existingItemIndex = state.expenses.findIndex(expense => expense.id === newExpense.id);
            if (existingItemIndex !== -1) {
                state.expenses[existingItemIndex] = newExpense;
            } else {
                state.expenses.push(newExpense);
            }
        },
        deleteExpense(state, action) {
            const id = action.payload;
            console.log(id);
            state.expenses = state.expenses.filter(expense => expense.id !== id);
        }
    },

});


    export const expenseAction = expensesSlice.actions;

    export default expensesSlice.reducer;


