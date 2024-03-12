import { useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseContextProvider = (props) =>{

    const [enteredExpenses,setEnteredExpenses]=useState([]);

    const addExpensesHandler = (expense) =>{
        setEnteredExpenses(prevExpense => [...prevExpense,expense])
    }

    const expenseContext ={
        expenses : enteredExpenses,
        addExpenses : addExpensesHandler,
        removeExpenses : ()=>{},
    }
    return(
        <>
        {console.log(expenseContext.expenses)}
        <ExpenseContext.Provider value = {expenseContext}>{props.children}</ExpenseContext.Provider>
        </>
    )
}

export default ExpenseContextProvider;