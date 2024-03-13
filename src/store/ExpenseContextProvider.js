import { useCallback, useEffect, useState } from "react";
import ExpenseContext from "./expense-context";
import axios from "axios";

const ExpenseContextProvider = (props) =>{

    const [enteredExpenses,setEnteredExpenses]=useState({});

    // const addExpensesHandler = (expense) =>{
    //     setEnteredExpenses(prevExpense => [...prevExpense,expense])
    // }

    const addExpensesToAPIHandler = async(expense)=>{
        try {
            const response = await axios.post("https://expense-tracker-http-default-rtdb.firebaseio.com/expense.json",expense)
            if (response.status === 200) {
                console.log(response.data);
                setEnteredExpenses((prevExpense) => [...prevExpense,expense])
            } else {
                throw new Error("Unable to upadte")   
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const getExpensesFromAPIHandler = useCallback(async()=>{
        try {
            const response = await axios.get("https://expense-tracker-http-default-rtdb.firebaseio.com/expense.json")
            if (response.status === 200) {
                // console.log(response.data);
                setEnteredExpenses(response.data)
            } else {
                throw new Error("Unable to fet data")   
            }
        } catch (error) {
            alert(error.message)
        }
    },[])

    useEffect(()=>{
        getExpensesFromAPIHandler()
    },[getExpensesFromAPIHandler])

    const expenseContext ={
        expenses : enteredExpenses,
        // addExpenses : addExpensesHandler,
        addExpensesToAPI : addExpensesToAPIHandler,
        getExpensesFromAPI :getExpensesFromAPIHandler,
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