import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import IncompleteProfile from "./IncompleteProfile";


describe("Incomplete Component",()=>{
    test("renders welcome message", () => {
      render(
        <Router>
          <IncompleteProfile />
        </Router>
      );
    
      const welcomeMessage = screen.getByText("Welcome to Expense Tracker");
      expect(welcomeMessage).toBeInTheDocument();
    });
})
