import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteExpenseFromAPI, expenseAction } from "../../store/expense";


const ListExpense = (props) => {
    const dispatch = useDispatch()
    const { item } = props;

    const deleteHandler = (event) => {
        event.preventDefault()
        dispatch(deleteExpenseFromAPI(item.id))
    }
    const editHandler = (event) =>{
        event.preventDefault()
        dispatch(expenseAction.setItemToEdit(item))
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