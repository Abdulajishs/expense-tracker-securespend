import React from "react"

const ExpenseContext = React.createContext({
    expenses : [],
    addExpenses : ()=>{},
    addExpensestoAPI : ()=>{},
    removeExpenses : ()=>{},
})

export default ExpenseContext