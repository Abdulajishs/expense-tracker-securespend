import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";
import Verification from "./pages/Verification";
import RootLayout from "./components/MainNavigation/RootLayout";

import classes from "./App.module.css";
import { fetchExpenses } from "./store/expense-actions";



function App() {
  const mode = useSelector(state => state.theme.mode);
  const userId = useSelector(state => state.token.userId);
  console.log(userId);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchExpenses(userId))
  },[dispatch,userId])
  
  return (
    <>
      <div className={mode ? classes.dark : classes.light}>
        <RootLayout>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="login/verify" element={<Verification />} />
            <Route path="home" exact element={<Home />} />
            <Route path="home/update" exact element={<UpdateProfile />} />
          </Routes>
        </RootLayout>
      </div>
    </>
  );
}

export default App;
