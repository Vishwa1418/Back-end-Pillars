import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Password from "./pages/password";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Loginpage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<Signuppage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/password" element={<Password/>}/>
      </Routes>
    </>
  );
}

export default App;
