import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tokenAction } from "../../store/token-slice";

const MainNavigation = () =>{
    const dispatch = useDispatch()

    const history = useNavigate();

    const logOutHandler = (event)=>{
        event.preventDefault()
        dispatch(tokenAction.removetoken())
        dispatch(tokenAction.removeUserId())
        history("login")
    }
    return (
        <header>
        <Button variant="danger" className="float-end" onClick={logOutHandler}>LogOut</Button>
        </header>
    )
}

export default MainNavigation;