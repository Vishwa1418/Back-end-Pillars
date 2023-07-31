import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Password from "./pages/password";
import Educators from "./pages/educators";
import './App.css'
import Layout from "./pages/layout";
import Quiz from "./pages/Quiz";
import Quizzes from "./pages/Quizzes";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Loginpage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<Signuppage/>}/>
        <Route path="/main" element={<Layout/>}>
          <Route path="home" element={<Home/>}/>
          <Route path="educators" element={<Educators/>}/>
          <Route path="quiz" element={<Quizzes/>}/>
          <Route path="quiz/:id" element={<Quiz/>}/>
        </Route>
        <Route path="/password" element={<Password/>}/>
      </Routes>
    </>
  );
}

export default App;
