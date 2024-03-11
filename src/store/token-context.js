import React from "react"
const TokenContext = React.createContext({
    idToken : "",
    isLoggedIn : false,
    addToken : ()=>{},
    removeToken : ()=>{}
})

export default TokenContext;