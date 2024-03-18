import { Button, Container, Table } from "react-bootstrap";
import ListExpense from "./ListExpense";
import { useSelector } from "react-redux";

const Expenses = () => {
    const expenses = useSelector(state => state.expenses.expenses)
    // console.log(expenses)
    const total = expenses.reduce((acc,expense) => acc + Number(expense.amount) ,0);
    let activatePremium
    if(total > 10000){
        activatePremium = true 
    }
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
            {activatePremium && <Button variant="success">Active Premium </Button>}
            <h2>Total : {total}</h2>
        </Container>
    )
}

export default Expenses;