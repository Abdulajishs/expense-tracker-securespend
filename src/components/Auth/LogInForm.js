import {  useRef, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {tokenAction} from "../../store/token-slice";

const LogInForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const history = useNavigate()
    const emailRef = useRef("")
    const passwordRef = useRef("")

    const dispatch = useDispatch()
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
                // history("verify")
                history("/home")
                dispatch(tokenAction.addtoken(data.idToken))
                const userId = email.replace(/\./g,"")
                console.log(userId);
                dispatch(tokenAction.addUserId(userId))
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

    const getOobConfirmationCode = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDxa2jQeSZwOU10O-lyyAtX2ncRc50xL98", {
                method: "POST",
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: emailRef.current.value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setIsLoading(false)
            const data = await response.json()
            if (response.ok) {
                console.log(data);
            } else {
                throw new Error("Something went wrong")
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const resetPasswordHandler = (event) => {
        event.preventDefault()
        getOobConfirmationCode()
    }
    return (
        <>
            <form onSubmit={submitHandler} className="d-flex flex-column justify-content-center align-items-center vh-100">
                <h2>Login</h2>
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                </FloatingLabel>
                <Button variant="primary" className=" mb-3" type="submit" >Log In</Button>
                {!isLoading &&
                    <Link to="#" className="mb-3" onClick={resetPasswordHandler} >Forgot password</Link>
                }
                {isLoading &&
                    <p className="text-dark">Loading....</p>
                }
                <Button variant="outline-success" onClick={signUpHandler}>Don't have an account? SignUp</Button>
            </form>
        </>
    )
}
export default LogInForm;