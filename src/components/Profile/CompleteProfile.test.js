import { render as rtlRender, screen } from "@testing-library/react";
import CompleteProfile from "./CompleteProfile";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const render = component => rtlRender(
    <Provider store={store}>
        <MemoryRouter>
            {component}
        </MemoryRouter>
    </Provider>
)

describe("CompleteProfile Component", () => {
  test("renders 'Complete now' link", () => {
    render(<CompleteProfile />);
    const completeNowLink = screen.getByText("Complete now");
    expect(completeNowLink).toBeInTheDocument();
  });

  test("renders 'Contact Details' header", () => {
    render(<CompleteProfile />);
    const contactDetailsHeader = screen.getByText("Contact Details");
    expect(contactDetailsHeader).toBeInTheDocument();
  });

  test("render interaction of update button",()=>{
    render(<CompleteProfile />);
    const buttonElement = screen.getByRole("button")
    userEvent.click(buttonElement)

    // expect()
  })


});