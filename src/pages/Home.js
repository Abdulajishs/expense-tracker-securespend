import ExpensesForm from "../components/Expenses/ExpensesForm"
import IncompleteProfile from "../components/Profile/IncompleteProfile"
import Expenses from "../components/Expenses/Expenses"

const Home = () =>{
    return(
        <>
        <IncompleteProfile />
        <ExpensesForm />
        <Expenses />
        </>
    )
}

export default Home