import { render as rtlRender, screen } from "@testing-library/react"
import LogInForm from "./LogInForm"
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import store from "../../store";
import { Provider } from "react-redux";


const render = component => rtlRender(
    <Provider store={store}>
        <MemoryRouter>
            {component}
        </MemoryRouter>
    </Provider>
)


describe("LogInForm Component", () => {
    test("renders Login as a text", () => {
        //Arrange
        render(
            <LogInForm />
        );
        //Act nothing in this

        //Assert
        const logInElement = screen.getByText("Login", { exact: false });
        expect(logInElement).toBeInTheDocument();
    })

    test("render email and password ", () => {
        render(
            <LogInForm />
        )

        const emailInput = screen.getByPlaceholderText("name@example.com");
        const passwordInput = screen.getByPlaceholderText("Password");

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    })

    test("render login and singup button", () => {
        render(
            <LogInForm />
        )

        const logInButton = screen.getByRole("button", { name: "Log In" })
        const SignUpButton = screen.getByRole("button", { name: "Don't have an account? SignUp" })

        expect(logInButton).toBeInTheDocument();
        expect(SignUpButton).toBeInTheDocument();
    })

    test("render Forgot password link", () => {
        render(
            <LogInForm />
        )

        const forgotPasswordLink = screen.getByText("Forgot password");
        expect(forgotPasswordLink).toBeInTheDocument();
    })

})

