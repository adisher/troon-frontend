import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { useSelector } from "react-redux";
import Users from "./Components/Users";
import UploadDoc from "./Components/UploadDoc";

function App() {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/upload-docs" element={<UploadDoc />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
