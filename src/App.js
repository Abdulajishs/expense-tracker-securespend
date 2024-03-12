import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";
import Verification from "./pages/Verification";
import RootLayout from "./components/MainNavigation/RootLayout";


function App() {
  return (
    <>
      <RootLayout>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="login/verify" element={<Verification />} />
          <Route path="home" exact element={<Home />} />
          <Route path="home/update" exact element={<UpdateProfile />} />
        </Routes> 
      </RootLayout>
    </>
  );
}

export default App;
