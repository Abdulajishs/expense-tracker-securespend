import { useCallback, useEffect, useState } from "react"
import TokenContext from "./token-context"

const TokenContextProvider = (props) =>{
    const initialToken = localStorage.getItem("tokenId")
    const [enteredToken , setEnteredToken] = useState(initialToken);

    const userIsLoggedIn = !!enteredToken

    const addTokenHandler = (token) =>{
        setEnteredToken(token)
        localStorage.setItem("tokenId",token)
    }

    const removeTokenHandler = useCallback(()=>{
        setEnteredToken("")
        localStorage.removeItem("tokenId")
    },[])

    useEffect(()=>{
        let timer;
        if (userIsLoggedIn) {
            timer =  setTimeout(() => {
                removeTokenHandler()
            }, 50000);
        }
        return ()=>clearTimeout(timer)
    },[userIsLoggedIn,removeTokenHandler])

    const tokenContext = {
        idToken : enteredToken,
        isLoggedIn : userIsLoggedIn,
        addToken : addTokenHandler,
        removeToken : removeTokenHandler
    }
    return(
        <>
        {/* {console.log(tokenContext.tokenId)} */}
        <TokenContext.Provider value={tokenContext}>{props.children}</TokenContext.Provider>
        </>
    )
}

export default TokenContextProvider;