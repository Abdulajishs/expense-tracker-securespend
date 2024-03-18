import { useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveExpenseToAPI, expenseAction, fetchExpensesFromAPI } from "../../store/expense";

const ExpensesForm = () => {
    const amountRef = useRef("");
    const descriptionRef = useRef("");
    const categoryRef = useRef("");

    const dispatch = useDispatch()
    const itemToEdit = useSelector(state => state.expenses.itemToEdit)

    useEffect(()=>{
        dispatch(fetchExpensesFromAPI())
    },[dispatch])

    useEffect(()=>{
        if(itemToEdit){
            amountRef.current.value=itemToEdit.amount
            descriptionRef.current.value=itemToEdit.description
            categoryRef.current.value=itemToEdit.category
        }
    },[itemToEdit])

    const submitHandler = (event) => {
        event.preventDefault()
        const expense = {
            id : itemToEdit ? itemToEdit.id : null,
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        }
        dispatch(saveExpenseToAPI(expense))

        dispatch(expenseAction.setItemToEdit())
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
                            <option>Other</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    {itemToEdit? "Update" : "Submit"}
                </Button>
            </Form>
        </Container>
    )
}

export default ExpensesForm;