import { useContext } from "react";
import { Button } from "react-bootstrap";
import ExpenseContext from "../../store/expense-context";

const ListExpense = (props) => {
    const { deleteExpensesFromAPI ,setItemToEdit } = useContext(ExpenseContext)
    const { item } = props;

    const deleteHandler = (event) => {
        event.preventDefault()
        deleteExpensesFromAPI(item)
    }
    const editHandler = (event) =>{
        event.preventDefault()
        setItemToEdit(item)
    }
    return (
        <tr key={item.id}>
            <td>{item.amount}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td >
                <Button variant="secondary" className="me-5" onClick={editHandler}>Edit</Button>
                <Button variant="danger" onClick={deleteHandler} >Delete</Button>
            </td>
        </tr>
    )
}

export default ListExpense;