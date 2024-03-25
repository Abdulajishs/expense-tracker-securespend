import { render, screen } from "@testing-library/react"
import SignUpForm from "./SignUpForm"
import { MemoryRouter } from "react-router-dom"


describe("SignUpForm Component", () => {
    test("render signUp as text ", () => {
        render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>
        )

        const SignUpElement = screen.getByText("Sign up");
        expect(SignUpElement).toBeInTheDocument()
    })

    test("render login and singup button",()=>{
        render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>
        )

        const logInButton = screen.getByRole("button" , {name:"Have an account? Login"})
        const SignUpButton = screen.getByRole("button" , {name:"Sign up"})

        expect(logInButton).toBeInTheDocument();
        expect(SignUpButton).toBeInTheDocument();
    })
})