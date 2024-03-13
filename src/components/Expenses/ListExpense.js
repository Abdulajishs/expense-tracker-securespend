import { useContext } from "react";
import ExpenseContext from "../../store/expense-context";
import { Container, Table } from "react-bootstrap";

const ListExpense = () => {
    const { expenses } = useContext(ExpenseContext)
    return (        
        <Container className="mt-3 p-5">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(expenses).map((item)=>(
                     <tr>
                     <td>{item.amount}</td>
                     <td>{item.description}</td>
                     <td>{item.category}</td>
                   </tr>
                ))}
            </tbody>
        </Table>
    </Container>
    )
}

export default ListExpense;