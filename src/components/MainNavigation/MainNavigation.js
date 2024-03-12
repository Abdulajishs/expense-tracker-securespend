import { useContext } from "react";
import { Button } from "react-bootstrap";
import TokenContext from "../../store/token-context";
import { useNavigate } from "react-router-dom";

const MainNavigation = () =>{
    const tokenCntx = useContext(TokenContext);

    const history = useNavigate();

    const logOutHandler = (event)=>{
        event.preventDefault()
        tokenCntx.removeToken()
        history("login")
    }
    return (
        <header>
        <Button variant="danger" className="float-end" onClick={logOutHandler}>LogOut</Button>
        </header>
    )
}

export default MainNavigation;