import { useContext, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ExpenseContext from "../../store/expense-context";

const ExpensesForm = () => {
    const amountRef = useRef("");
    const descriptionRef = useRef("");
    const categoryRef = useRef("");

    const expenseCntxt = useContext(ExpenseContext);

    const submitHandler = (event) => {
        event.preventDefault()
        const expense = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        }
        // expenseCntxt.addExpenses(expense)
        expenseCntxt.addExpensestoAPI(expense)
        amountRef.current.value=""
        descriptionRef.current.value =""
        categoryRef.current.value =""
    }
    return (
        <Container>
            <Form onSubmit={submitHandler}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="Enter Amount" ref={amountRef} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" ref={descriptionRef} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Select ref={categoryRef} required>
                            <option>Food</option>
                            <option>Petrol</option>
                            <option>Salary</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default ExpensesForm;