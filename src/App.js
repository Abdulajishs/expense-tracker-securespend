import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="login" element={<LogIn />} />
      <Route path="home" element={<Home />} />
    </Routes>
    </>
  );
}

export default App;
