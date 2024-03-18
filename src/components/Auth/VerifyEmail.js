import { Button, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const VerifyEmail = () => {
    const token = useSelector(state => state.token.idToken)
    console.log(token);
    const history = useNavigate()
    const getOobConfirmationCode = async () => {
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDxa2jQeSZwOU10O-lyyAtX2ncRc50xL98", {
                method: "POST",
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: token
                })
            })
            // console.log(response);
            // const data = await response.json()
            if (response.ok) {
                // console.log(data);
                history("/home")

            } else {
                throw new Error("Unable to verify")
            }
        } 
        catch (error) {
            alert(error.message)
        }
    }

    const VerifyHandler = (event) => {
        event.preventDefault()
        getOobConfirmationCode()
    }
    return (
        <>
            <Container className="mt-2  border-bottom border-black">
                <Row className="mb-2">
                    <Col md={4}><p>Welcome to Expense Tracker</p></Col>
                    <Col md={{ span: 4, offset: 4 }} >
                        <Button variant="warning" onClick={VerifyHandler}>
                            Verify Email
                            {/* <Link to="update" >Complete now</Link> */}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default VerifyEmail