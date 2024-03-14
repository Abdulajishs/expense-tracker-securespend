import React from "react"

const ExpenseContext = React.createContext({
    expenses : [],
    addExpensesToAPI : ()=>{},
    getExpensesFromAPI : ()=>{},
    deleteExpensesFromAPI : ()=>{},
    itemToEdit : null,
    setItemToEdit : ()=>{},
})

export default ExpenseContext