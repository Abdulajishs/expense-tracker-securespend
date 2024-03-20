import { Button, Container, Table } from "react-bootstrap";
import ListExpense from "./ListExpense";
import { useSelector } from "react-redux";
import PremiumFeatures from "../Premium/PremiumFeatures";
import { useState } from "react";


const Expenses = () => {
    const expenses = useSelector(state => state.expenses.expenses)
    const [addtionalFeatures,setAddtionalFeatures] = useState(false)

    // console.log(expenses)
    const total = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);

    const activatePremiumHandler = () => {
        setAddtionalFeatures(prev => !prev)
    }

    return (
        <>
            {addtionalFeatures && <PremiumFeatures />}
            <Container className="mt-3 p-5 vh-100" >
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
                            <ListExpense item={item} />
                        ))}
                    </tbody>
                </Table>
                {total >= 10000 && 
                <Button variant="success" onClick={activatePremiumHandler}>Activate Premium </Button>}
                <h2>Total : {total}</h2>
            </Container>
        </>
    )
}

export default Expenses;