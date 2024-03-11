import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="login" element={<LogIn />} />
      <Route path="home" exact element={<Home />} />
      <Route path="home/update" exact element={<UpdateProfile/>} />
    </Routes>
    </>
  );
}

export default App;
