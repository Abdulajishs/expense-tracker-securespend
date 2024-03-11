import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const IncompleteProfile = () => {
    return (
        <>
        <Container className="mt-2  border-bottom border-black">
            <Row className="mb-2">
                <Col md={4}><p>Welcome to Expense Tracker</p></Col>
                <Col md={{ span: 4, offset: 4 }} >
                    <Button variant="secondary">
                        Your profile is Incomplete.
                        <Link to="update" >Complete now</Link>
                    </Button>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default IncompleteProfile;