import { useContext } from "react";
import ExpenseContext from "../../store/expense-context";
import { Container, Table } from "react-bootstrap";
import ListExpense from "./ListExpense";

const Expenses = () => {
    const { expenses } = useContext(ExpenseContext)
    // console.log(Object.keys(expenses));

    // console.log(expenseArray);

    
    return (
        <Container className="mt-3 p-5">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((item) => (
                        <ListExpense item ={item} />
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Expenses;