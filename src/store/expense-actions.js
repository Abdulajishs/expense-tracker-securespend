import axios from "axios";
import { expenseAction } from "./expense-slice";

export const fetchExpenses = () => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await axios.get("https://expense-tracker-http-default-rtdb.firebaseio.com/expense.json");
            if (response.status === 200) {
                const data = response.data;
                if (data) {
                    const expenses = Object.keys(data).map((key) => ({ id: key, ...data[key], }));
                    console.log(expenses);
                    return expenses
                } else {
                    return []
                }
            } else {
                throw new Error("fetching data failed!")
            }
        }
        try {
            const data = await sendRequest();
            // console.log(data);
            dispatch(expenseAction.replaceExpense(data))
        } catch (error) {
            alert(error.message)
        }
    }
}

export const saveExpenseToAPI = (item) => {
    return async (dispatch) => {
        const sendRequest = async (item) => {
           
            console.log(item.id);
            if (item.id) {
                try {
                    const response = await axios.put(
                        `https://expense-tracker-http-default-rtdb.firebaseio.com/expense/${item.id}.json`,
                        item
                    )
                    if (response.status === 200) {
                        console.log(response.data);
                        dispatch(expenseAction.saveExpense(response.data))
                    } else {
                        throw new Error("Unable to upadte")
                    }
                } catch (error) {
                    alert(error.message)

                }
            } else {
                try {
                    const response = await axios.post(
                        "https://expense-tracker-http-default-rtdb.firebaseio.com/expense.json",
                        item
                    );
                    console.log(response.data);
                    if (response.status === 200) {
                        dispatch(expenseAction.saveExpense({ ...item, id: response.data.name }))
                    } else {
                        throw new Error("Unable to add expense")
                    }
                } catch (error) {
                    alert(error.message)
                }
            }
        }
        await sendRequest(item)
    }
}


export const deleteExpenseInAPI = (id) => {
    return async (dispatch) => {
        const sendRequest = async (id) => {
            try {
                const response = await axios.delete(`https://expense-tracker-http-default-rtdb.firebaseio.com/expense/${id}.json`);
                if (response.status === 200) {
                    return dispatch(expenseAction.deleteExpense(id))
                } else {
                    throw new Error("Something went wrong in delete expense")
                }
            } catch (error) {
                alert(error.message)
            }
        }
        await sendRequest(id)
    }
}