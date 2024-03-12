import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import url from "./url.jpg"
import user from "./user.png"
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import TokenContext from "../../store/token-context";

const CompleteProfile = () => {
    const [userInfo, setUserInfo] = useState({})

    const nameRef = useRef("");
    const urlRef = useRef("");
    const tokenCntx = useContext(TokenContext);
    const tokenId = tokenCntx.idToken;

    const setAccountInfo  = async(name, url)=>{
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDxa2jQeSZwOU10O-lyyAtX2ncRc50xL98",{
                method : "POST",
                body : JSON.stringify({
                    idToken : tokenId,
                    displayName : name,
                    photoUrl : url,
                    returnSecureToken : true
                }),
                "Content-Type" : "application/json"
            })

            const data = await response.json();
            if (response.ok) {
                console.log(data);
            } else {
                throw new Error("Unable to update profile")
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const getAccountInfo = useCallback (async (tokenId) => {
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDxa2jQeSZwOU10O-lyyAtX2ncRc50xL98', {
                method: "POST",
                body: JSON.stringify({
                    idToken: tokenId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(response);
            if (response.ok) {
                console.log(data);
                setUserInfo(data.users[0])
            } else {
                throw new Error("Failed to get Account Info")
            }
        } catch (error) {
            alert(error.message)
        }
    },[])

    useEffect(()=>{
        getAccountInfo(tokenId)
    },[getAccountInfo,tokenId])
   

    const updateProfileHandler = (event) => {
        event.preventDefault()
        const name = nameRef.current.value;
        const url = urlRef.current.value;

        setAccountInfo(name, url)

        nameRef.current.value = ""
        urlRef.current.value = ""
    }
    return (
        <>
            <Container className="mt-1 border-bottom border-black">
                <Row>
                    <Col md={4}><p>Winners never quite, Quitters never win.</p></Col>
                    <Col md={{ span: 4, offset: 4 }}  >
                        <Button variant="secondary" className="mb-3" >
                            Your profile is 64% completed,A complete profile has higher chances of landing a job.
                            <Link  >Complete now</Link>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container className="mt-4 w-75 me-0 border-bottom " >
                <Form>
                    <Row>
                        <Col md={4}>
                            <h4>Contact Details</h4>
                        </Col>
                        <Col md={{ span: 2, offset: 6 }} >
                            <Button variant="outline-danger">Cancel</Button>
                        </Col>
                    </Row>
                    <Row className="mb-3 align-items-center">
                        <Form.Group as={Col} controlId="formGridName">
                            <img src={user} alt="logo" width={35} height={35} />
                            <Form.Label>Full Name:</Form.Label>
                            <Form.Control type="text" ref={nameRef} defaultValue={userInfo.displayName} required/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridProfile">
                            <img src={url} alt="logo" width={35} height={35} />
                            <Form.Label>Profile Photo URL</Form.Label>
                            <Form.Control type="text" ref={urlRef} defaultValue={userInfo.photoUrl} required/>
                        </Form.Group>
                    </Row>
                    <Button variant="info" className="mb-3" onClick={updateProfileHandler}>Update</Button>
                </Form>
            </Container>
        </>
    )
}

export default CompleteProfile;