import ExpensesForm from "../components/Expenses/ExpensesForm"
import ListExpense from "../components/Expenses/ListExpense"
import IncompleteProfile from "../components/Profile/IncompleteProfile"

const Home = () =>{
    return(
        <>
        <IncompleteProfile />
        <ExpensesForm />
        <ListExpense />
        </>
    )
}

export default Home