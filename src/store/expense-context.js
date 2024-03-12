import React from "react"

const ExpenseContext = React.createContext({
    expenses : [],
    addExpenses : ()=>{},
    removeExpenses : ()=>{},
})

export default ExpenseContext