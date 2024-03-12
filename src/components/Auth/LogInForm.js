import { useContext, useRef } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "../../store/token-context";


const LogInForm = () => {
    const history = useNavigate()
    const emailRef = useRef("")
    const passwordRef = useRef("")

    const tokenCntx = useContext(TokenContext);
    const authHandler = async (email, password) => {
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxa2jQeSZwOU10O-lyyAtX2ncRc50xL98", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();

            if (response.ok) {
                // console.log(data);
                history("verify")
                tokenCntx.addToken(data.idToken)
            } else {
                throw new Error("Credentials Incorrect, Check Email or Password")
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value

        authHandler(email, password)

        emailRef.current.value = ""
        passwordRef.current.value = ""
    }

    const signUpHandler = (event) => {
        event.preventDefault()
        history("/")
    }
    return (
        <form onSubmit={submitHandler} className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h2>Login</h2>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
            </FloatingLabel>

            <Button variant="primary" className=" mb-3" type="submit" >Log In</Button>
            <Link to="/" className="mb-3">Forgot password</Link>
            <Button variant="outline-success" onClick={signUpHandler}>Don't have an account? SignUp</Button>
        </form>
    )
}
export default LogInForm;