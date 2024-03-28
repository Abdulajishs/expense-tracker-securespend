import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../store/expense-slice";
import { deleteExpenseInAPI } from "../../store/expense-actions";


const ListExpense = (props) => {
    const userId = useSelector(state => state.token.userId)
    const dispatch = useDispatch()
    const { item } = props;

    const deleteHandler = (event) => {
        event.preventDefault()
        dispatch(deleteExpenseInAPI(item.id,userId))
        }
    const editHandler = (event) =>{
        event.preventDefault()
        dispatch(expenseAction.setItemToEdit(item))
    }
    return (
        <tr >
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