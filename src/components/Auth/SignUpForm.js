import { useRef } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const cnfrmPasswordRef = useRef("");

  const history = useNavigate()

  const addUserHandler = async (email, password) => {
    try {
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxa2jQeSZwOU10O-lyyAtX2ncRc50xL98", {
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
      console.log(response);
      const data = await response.json()
      if (response.ok) {
        console.log(data);
        console.log("User is successfully logged in");
      } else {
        throw new Error("Authentication is failed..")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const cnfrmPassword = cnfrmPasswordRef.current.value;

    if (password !== cnfrmPassword) {
      alert("Passwords doesn't match");
      return
    }

    addUserHandler(email, password)

    emailRef.current.value = ""
    passwordRef.current.value = ""
    cnfrmPasswordRef.current.value = ""
  }

  const loginHandler = (event)=>{
    event.preventDefault()
    history("login")
  }

  return (
    <form onSubmit={submitHandler} className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="mb-3">SignUp</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
        <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingConfirmPassword" label="ConfirmPassword" className="mb-3">
        <Form.Control type="password" placeholder="Confirm Password" ref={cnfrmPasswordRef} required />
      </FloatingLabel>
      <Button variant="primary" className="mb-3" type="submit">Sign up</Button>
      <div>
        <Button variant="outline-success" onClick={loginHandler} >Have an account? Login</Button>
      </div>
    </form>

  )
}

export default SignUpForm;