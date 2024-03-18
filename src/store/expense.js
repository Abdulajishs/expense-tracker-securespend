import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk action to fetch expenses from API

export const fetchExpensesFromAPI = createAsyncThunk(
    "expenses/fetchExpensesFromAPI",
    async () => {
        const response = await axios.get("https://expense-tracker-http-default-rtdb.firebaseio.com/expense.json");
        if (response.status === 200) {
            const data = response.data;
            if (data) {
                //   console.log(data);
                const expenses = Object.keys(data).map((key) => ({ id: key, ...data[key] }))
                //   console.log(expenses);
                return expenses;
            } else {
                return [];
            }
        } else {
            throw new Error("Unable to get expenses");
        }
    }
);

// Async thunk action to add or update an expense
export const saveExpenseToAPI = createAsyncThunk(
    "expenses/addOrUpdateExpense",
    async (expense) => {
        if (expense.id) {
            // If expense has an ID, it's an edit, so send a PUT request
            // const body  
            const response = await axios.put(
                `https://expense-tracker-http-default-rtdb.firebaseio.com/expense/${expense.id}.json`,
                expense
            );
            return response.data;
        } else {
            // If expense doesn't have an ID, it's a new expense, so send a POST request
            const response = await axios.post(
                "https://expense-tracker-http-default-rtdb.firebaseio.com/expense.json",
                expense
            );
            if (response.status === 200) {
                // console.log(response.data);
                return { ...expense, id: response.data.name };
            } else {
                throw new Error("Unable to upadte")
            }
        }
    }
);

// Async thunk action to delete an expense
export const deleteExpenseFromAPI = createAsyncThunk(
    "expenses/deleteExpense",
    async (expenseId) => {
        const response = await axios.delete(
            `https://expense-tracker-http-default-rtdb.firebaseio.com/expense/${expenseId}.json`
        );
        if (response.status === 200) {
            return expenseId;
        } else {
            throw new Error("Unable to delete expense");
        }
    }
);

// Slice for managing expenses state
const expensesSlice = createSlice({
    name: "expenses",
    initialState: {
        expenses: [],
        itemToEdit: null,
        status: "idle",
        error: null,
    },
    reducers: {
        setItemToEdit(state, action) {
            state.itemToEdit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpensesFromAPI.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchExpensesFromAPI.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.expenses = action.payload;
            })
            .addCase(fetchExpensesFromAPI.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })
            .addCase(saveExpenseToAPI.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedExpense = action.payload;
                const index = state.expenses.findIndex(
                    (expense) => expense.id === updatedExpense.id
                );
                if (index !== -1) {
                    state.expenses[index] = updatedExpense;
                } else {
                    state.expenses.push(updatedExpense);
                }
            })
            .addCase(deleteExpenseFromAPI.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.expenses = state.expenses.filter(
                    (expense) => expense.id !== action.payload
                );
            });
    },
});


export const expenseAction = expensesSlice.actions;

export default expensesSlice.reducer;


