import { useCallback, useEffect, useState } from "react";
import ExpenseContext from "./expense-context";
import axios from "axios";

const ExpenseContextProvider = (props) => {

    const [enteredExpenses, setEnteredExpenses] = useState([]);
    const [itemToEdit, setItemToEdit] = useState(null)

    const addExpensesToAPIHandler = async (expense) => {
        console.log(expense.id);
        if (expense.id) {
            const body = {...expense}
            delete body.id
            console.log(body);
            try {
                const response = await axios.put(`https://expense-tracker-http-default-rtdb.firebaseio.com/expense/${expense.id}.json`, body)
                if (response.status === 200) {
                    const existingIndexExpense = enteredExpenses.findIndex((item) => item.id === expense.id)
                    console.log(existingIndexExpense);
                    if (existingIndexExpense !== -1) {
                        const updateExpense = [...enteredExpenses]
                        updateExpense[existingIndexExpense] = expense
                        setEnteredExpenses([...updateExpense])
                        console.log("Expense successfuly updated");
                    } else {
                        console.log("Expense not updated");
                    }
                } else {
                    throw new Error("Unable to delete data")
                }
            } catch (error) {
                alert(error.message)
            }
        } else {
            try {
                const response = await axios.post("https://expense-tracker-http-default-rtdb.firebaseio.com/expense.json", expense)
                if (response.status === 200) {
                    console.log(response.data);
                    setEnteredExpenses((prevExpense) => [...prevExpense, expense])
                } else {
                    throw new Error("Unable to upadte")
                }
            } catch (error) {
                alert(error.message)
            }
        }

    }

    const getExpensesFromAPIHandler = useCallback(async () => {
        try {
            const response = await axios.get("https://expense-tracker-http-default-rtdb.firebaseio.com/expense.json")
            const data = response.data
            if (response.status === 200) {
                // console.log(response.data);
                if (data) {
                    const expenseArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                    setEnteredExpenses(expenseArray)
                } else {
                    setEnteredExpenses([])
                }
            } else {
                throw new Error("Unable to get data")
            }
        } catch (error) {
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        getExpensesFromAPIHandler()
    }, [getExpensesFromAPIHandler])


    const deleteExpensesFromAPIHandler = async (expense) => {
        // console.log(expense.id);
        try {
            const response = await axios.delete(`https://expense-tracker-http-default-rtdb.firebaseio.com/expense/${expense.id}.json`)
            if (response.status === 200) {
                setEnteredExpenses((prevExpenses) => prevExpenses.filter((prevExpense) => prevExpense.id !== expense.id))
                console.log("Expense successfuly deleted");
            } else {
                throw new Error("Unable to delete data")
            }
        } catch (error) {
            alert(error.message)
        }
    }


    const expenseContext = {
        expenses: enteredExpenses,
        addExpensesToAPI: addExpensesToAPIHandler,
        getExpensesFromAPI: getExpensesFromAPIHandler,
        deleteExpensesFromAPI: deleteExpensesFromAPIHandler,
        itemToEdit: itemToEdit,
        setItemToEdit: setItemToEdit
    }
    return (
        <>
            {console.log(expenseContext.expenses)}
            <ExpenseContext.Provider value={expenseContext}>{props.children}</ExpenseContext.Provider>
        </>
    )
}

export default ExpenseContextProvider;